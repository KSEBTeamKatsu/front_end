import React, { useRef, useState } from "react";
import "./fileUpload.css";

function FileUpload() {
  // 업로드된 이미지 파일 목록 상태
  const [imageFiles, setImageFiles] = useState([]);
  // 오류 메시지 상태
  const [error, setError] = useState("");
  // 파일 입력 요소에 대한 참조
  const fileInputRef = useRef(null);

  // 파일 선택 버튼 클릭 시 파일 입력 요소 클릭 이벤트 트리거
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 호출되는 이벤트 핸들러
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // 이미지 파일만 필터링
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  // 드래그 오버 시 스타일 변경을 위한 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  // 드래그 리브 시 스타일 복원 이벤트 핸들러
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  // 드래그 앤 드롭 시 파일 처리 이벤트 핸들러
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const files = Array.from(e.dataTransfer.files);
    // 이미지 파일만 필터링
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  // 선택된 이미지 파일 삭제 이벤트 핸들러
  const handleDelete = (e) => {
    e.stopPropagation();
    setImageFiles([]);
    fileInputRef.current.value = "";
  };

  // 이미지 업로드 제출 이벤트 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("!!로그인 하시오!!");
      return;
    }

    // 업로드할 이미지가 없을 경우 경고
    if (imageFiles.length === 0) {
      alert("업로드할 이미지가 없습니다.");
      return;
    }

    const formData = new FormData();
    // 이미지 파일을 FormData에 추가
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // 응답이 실패일 경우 에러 처리
      if (!response.ok) {
        throw new Error("업로드 실패");
      }

      const data = await response.json();
      console.log("서버 응답:", data); // 실제 구조 확인

      // 만약 data.state가 문자열이라면:
      const objString =
        typeof data.state === "string" ? data.state : data.state?.state;

      let objS = "";

      if (objString === "apple") {
        objS = "사과";
      } else if (objString === "tomato") {
        objS = "토마토";
      } else {
        objS = "알 수 없음";
      }
      alert("AI분석 결과 " + objS + "입니다!!");

      // 업로드 후 상태 초기화
      setImageFiles([]);
      fileInputRef.current.value = "";
      setError("");
    } catch (err) {
      alert("업로드 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <form
      className="upload-page drop-zone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      {error && <p className="error">{error}</p>}
      {imageFiles.length === 0 ? (
        <button type="button" className="upload-btn" onClick={handleClick}>
          이미지 선택 또는 드래그 앤 드롭
        </button>
      ) : (
        <div className="file-preview">
          <div className="button-group">
            <button
              type="button"
              className="action-button delete"
              onClick={handleDelete}
            >
              뒤로
            </button>
            <button
              type="submit"
              className="action-button upload"
              onClick={(e) => e.stopPropagation()}
            >
              업로드
            </button>
          </div>
          <div className="thumbnail-grid">
            {imageFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="thumbnail"
              />
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

export default FileUpload;
