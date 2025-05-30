import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/nav/nav";
import Board from "./component/board/board";
import Gallery from "./component/gallery/gallery";
import Login from "./component/login/login";
import Register from "./component/register/register";
import FileUpload from "./component/fileUpload/fileUpload";
import Write from "./component/write/write"; // 새 글 작성 컴포넌트

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 게시글", content: "내용입니다." },
  ]);
  return (
    <BrowserRouter>
      <Routes>
        {/* 일반 페이지는 네비게이션 포함 */}
        <Route
          path="/"
          element={
            <div className="App">
              <Nav />
              <FileUpload />
            </div>
          }
        />
        <Route
          path="/board"
          element={
            <div className="App">
              <Nav />
              <Board posts={posts} />
            </div>
          }
        />
        <Route
          path="/write"
          element={
            <div className="App">
              <Nav />
              <Write posts={posts} setPosts={setPosts} />
            </div>
          }
        />
        <Route
          path="/gallery"
          element={
            <div className="App">
              <Nav />
              <Gallery />
              <FileUpload />
            </div>
          }
        />

        <Route path="/register-popup" element={<Register />} />

        {/* 로그인 팝업은 Nav 없이 Login만 */}
        <Route path="/login-popup" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
