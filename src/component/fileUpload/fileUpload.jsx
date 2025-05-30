import React, { useRef, useState } from "react";
import "./fileUpload.css";

function FileUpload() {
  // 업로드한 이미지 파일 목록을 상태로 관리
  const [imageFiles, setImageFiles] = useState([]);

  // 숨겨진 input[type=file] 엘리먼트에 직접 접근하기 위한 ref
  const fileInputRef = useRef(null);

  // 영역 클릭 시 숨겨진 파일 선택창을 열기 위한 함수
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택창에서 파일이 선택되었을 때 호출됨
  // 파일 중 이미지 타입만 필터링하여 상태에 저장
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  // 드래그된 파일이 영역 위에 있을 때 호출됨
  // 기본 동작 막고, CSS 클래스 추가해 시각 효과 주기
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  // 드래그된 파일이 영역을 벗어났을 때 호출됨
  // CSS 클래스 제거
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  // 드래그 앤 드롭으로 파일이 놓여졌을 때 호출됨
  // 기본 동작 막고 CSS 클래스 제거
  // 드롭된 파일 중 이미지 타입만 필터링해 상태에 저장
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  // 삭제 버튼 클릭 시 호출됨
  // 이벤트 버블링 막고, 선택된 이미지 목록 및 input 값 초기화
  const handleDelete = (e) => {
    e.stopPropagation();
    setImageFiles([]);
    fileInputRef.current.value = "";
  };

  // 폼 제출 시 호출되는 함수 (실제 업로드 동작 수행)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    e.stopPropagation();

    // 업로드할 이미지가 없으면 경고 후 종료
    if (imageFiles.length === 0) {
      alert("업로드할 이미지가 없습니다.");
      return;
    }

    // FormData 객체 생성 (멀티파트 폼 데이터)
    const formData = new FormData();
    // 이미지 파일들을 서버에 맞는 키("images")로 추가
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // fetch API를 사용해 POST 요청 보내기
      // Content-Type은 브라우저가 자동 설정하므로 지정하지 않음
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      // 응답이 정상이 아니면 예외 발생
      if (!response.ok) {
        throw new Error("업로드 실패");
      }

      // 서버에서 JSON 응답 받기
      const data = await response.json();

      alert("업로드 성공! 서버 응답: " + JSON.stringify(data));

      // 업로드 후 상태 및 input 초기화
      setImageFiles([]);
      fileInputRef.current.value = "";
    } catch (error) {
      // 업로드 중 오류가 발생하면 경고 및 콘솔에 로그 출력
      alert("업로드 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    // form 태그로 감싸서 submit 이벤트로 업로드 처리
    // 클릭, 드래그 관련 이벤트 핸들러 설정
    <form
      className="upload-page drop-zone"
      onClick={handleClick} // 영역 클릭 시 파일 선택창 열기
      onDragOver={handleDragOver} // 드래그 오버 시 스타일 변경
      onDragLeave={handleDragLeave} // 드래그 리브 시 스타일 원복
      onDrop={handleDrop} // 파일 드롭 시 처리
      onSubmit={handleSubmit} // 폼 제출 시 업로드 처리
    >
      {/* 실제 파일 선택 input (숨김 처리) */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*" // 이미지 파일만 선택 가능
        multiple // 다중 선택 허용
        onChange={handleFileChange} // 파일 선택 변경 감지
      />
      {imageFiles.length === 0 ? (
        // 이미지가 없으면 업로드 버튼 노출
        <button type="button" className="upload-btn">
          여러 이미지 선택 또는 드래그 앤 드롭
        </button>
      ) : (
        // 이미지가 있으면 미리보기 및 삭제/업로드 버튼 노출
        <div className="file-preview">
          <div className="thumbnail-grid">
            {/* 선택된 이미지 파일들 썸네일로 미리보기 */}
            {imageFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)} // 로컬 URL 생성
                alt={file.name}
                className="thumbnail"
              />
            ))}
          </div>
          <div className="button-group">
            {/* 삭제 버튼 */}
            <button
              type="button"
              className="action-button delete"
              onClick={handleDelete}
            >
              삭제
            </button>
            {/* 업로드 버튼 */}
            <button
              type="submit" // 폼 제출 버튼
              className="action-button upload"
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지 (파일 선택창 재오픈 방지)
            >
              업로드
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default FileUpload;
