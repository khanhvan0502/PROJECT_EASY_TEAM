import axios from "axios";
import React, { useState } from "react";
function Dashboard() {
  const [countUser, setCountUser] = useState("");
  axios.get(`api/profile`).then((res) => {
    if (res.status === 200) {
      setCountUser(res.data.length);
    }
  });
  // category
  const [countCategory, setCountCategory] = useState("");
  axios.get(`/api/all-category-quizzes`).then((res) => {
    if (res.status === 200) {
      setCountCategory(res.data.length);
      console.log(res.data.length);
    }
  });

  const [countQuiz, setCountQuiz] = useState("");
  axios.get(`api/get-all-quiz`).then((res) => {
    if (res.status === 200) {
      setCountQuiz(res.data.length);

    }
  });




  return (
    // Dashboard with reactjs
    <div className="dashboard">
      <div className="card-dashboard">
        <div className="card-icon">
          <div className="icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
        <h4 className="card-title">Số lượng người dùng</h4>
        <p className="card-text">{countUser} Users</p>
      </div>

      <div
        className="card-dashboard"
        style={{ backgroundColor: "rgb(255 247 205)" }}
      >
        <div
          className="card-icon"
          style={{
            border: "1px solid rgb(122, 79, 1)",
            boxShadow: "rgb(122, 79, 1) 2px 3px 10px",
          }}
        >
          <div
            className="icon"
            style={{
              color: "rgb(122, 79, 1)",
            }}
          >
            <i className="fas fa-question"></i>
          </div>
        </div>
        <h4
          className="card-title"
          style={{
            color: "rgb(122, 79, 1)",
          }}
        >
          Số lượng câu hỏi
        </h4>
        <p
          className="card-text"
          style={{
            color: "rgb(122, 79, 1)",
          }}
        >
          {countQuiz} Quizzes
        </p>
      </div>

      <div
        className="card-dashboard"
        style={{ backgroundColor: "rgb(255, 231, 217)" }}
      >
        <div
          className="card-icon"
          style={{
            border: "1px solid rgb(183, 33, 54)",
            boxShadow: "rgb(183, 33, 54) 2px 3px 10px",
          }}
        >
          <div
            className="icon"
            style={{
              color: "rgb(183, 33, 54)",
            }}
          >
            <i className="fas fa-stream"></i>
          </div>
        </div>
        <h4
          className="card-title"
          style={{
            color: "rgb(183, 33, 54)",
          }}
        >
          Số bộ câu hỏi
        </h4>
        <p
          className="card-text"
          style={{
            color: "rgb(183, 33, 54)",
          }}
        >
          {countCategory} Categories
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
