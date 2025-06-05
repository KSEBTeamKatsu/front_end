import React, { useState } from "react";
import "./login.css";

function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id || !pw) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
        credentials: "include",
      });

      if (response.status === 401) {
        setError("아이디 또는 비밀번호가 잘못되었습니다.");
        return;
      }

      if (!response.ok) {
        setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }

      window.opener.postMessage("loginSuccess", "*");
      alert("로그인 성공!");
      setError("");
      window.close();
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>로그인</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;
