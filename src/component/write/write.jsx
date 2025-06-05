import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";

function Write({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력하세요");
      return;
    }

    try {
      // 백엔드로 POST 요청 보내기
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content, userId: "login ID" }), // userId는 필요에 따라 프론트에서 보내거나 백엔드에서 처리
      });

      if (!response.ok) throw new Error("게시글 작성 실패");

      // 게시글 작성 후 게시판으로 이동
      navigate("/board");
    } catch (err) {
      console.error(err);
      alert("게시글 작성 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="write-container">
      <h2>글 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}

export default Write;
