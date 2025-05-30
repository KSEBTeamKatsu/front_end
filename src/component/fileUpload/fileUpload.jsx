import React, { useRef, useState } from "react";
import "./fileUpload.css";

function FileUpload() {
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImageFiles(imageFiles);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setImageFiles([]);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageFiles.length === 0) {
      alert("업로드할 이미지가 없습니다.");
      return;
    }

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("업로드 실패");
      }

      const data = await response.json();
      const obj = data.state;
      const objString = obj.state;

      alert("업로드 성공! 서버 응답: " + objString);

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
      onClick={handleClick}
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
        <button type="button" className="upload-btn">
          여러 이미지 선택 또는 드래그 앤 드롭
        </button>
      ) : (
        <div className="file-preview">
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
          <div className="button-group">
            <button
              type="button"
              className="action-button delete"
              onClick={handleDelete}
            >
              삭제
            </button>
            <button
              type="submit"
              className="action-button upload"
              onClick={(e) => e.stopPropagation()}
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
