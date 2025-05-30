import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./board.css";

function Board() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 백엔드 프록시 설정에 맞춰 /api/posts 로 요청
        const response = await fetch("/api/posts");

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON but got: ${contentType}\nResponse: ${text}`
          );
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const goToWrite = () => {
    navigate("/write");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="board-container">
      <h2>게시판</h2>
      <button className="write-btn" onClick={goToWrite}>
        글 작성하기
      </button>
      <ul className="post-list">
        {currentPosts.length === 0 ? (
          <li className="no-posts">등록된 게시글이 없습니다.</li>
        ) : (
          currentPosts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              {/* content는 2줄까지만 보여주도록 CSS에서 처리 */}
              <p className="content-preview">{post.content}</p>
            </li>
          ))
        )}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Board;
