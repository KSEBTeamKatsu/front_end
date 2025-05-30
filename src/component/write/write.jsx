import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";

function Write({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력하세요");
      return;
    }

    // 새로운 게시글 객체 생성 (id는 간단히 posts.length + 1로 설정)
    const newPost = {
      id: posts.length + 1,
      title,
      content,
    };

    // posts 상태에 새 게시글 추가
    setPosts([newPost, ...posts]);

    // 작성 후 게시판 페이지로 이동
    navigate("/board");
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
