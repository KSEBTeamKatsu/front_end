import React from "react";
import { useNavigate } from "react-router-dom";
import "./board.css";

function Board({ posts }) {
  const navigate = useNavigate();

  const goToWrite = () => {
    navigate("/write");
  };

  return (
    <div className="board-container">
      <h2>게시판</h2>
      <button className="write-btn" onClick={goToWrite}>
        글 작성하기
      </button>
      <ul className="post-list">
        {posts.length === 0 ? (
          <li className="no-posts">등록된 게시글이 없습니다.</li>
        ) : (
          posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Board;
