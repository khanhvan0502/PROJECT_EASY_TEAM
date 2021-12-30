import React, { useState, useEffect } from "react";
import "./ContentQuestion.css";
import Footer from "../../../layouts/frontend/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import AddComment from "../Comment/AddComment";
import ViewComment from "../Comment/ViewComment";
import { Link } from "react-router-dom";
function ContentQuestion() {
  const [question, setQuestion] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const question_slug =
    useLocation().pathname.split("/")[
    useLocation().pathname.split("/").length - 1
    ];
  useEffect(() => {
    axios.get(`/api/question/${question_slug}`).then((res) => {
      if (res.data.status === 200) {
        setQuestion(res.data.data);
        setQuestionId(res.data.id);
      }
    });
  }, []);

  const votes = (e) => {
    e.preventDefault();
    axios
      .post(`/api/question/save-votes`, { question_id: questionId })
      .then((res) => {
        window.location.reload();
      });
  };

  var showQuestion = "";
  showQuestion = question.map((item) => {
    return (
      <div className="content-question-container">
        <div
          className="breadcrumb"
          style={{ backgroundColor: "#fff", padding: "20px" }}
        >
          <i className="fa fas fa-home" style={{ fontSize: '22px' }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              &nbsp;<b>Trang chủ</b>{" "}
            </Link>
            /
            <b>
              {" "}
              <Link to="/question" style={{ textDecoration: "none", color: "black" }}>Câu hỏi</Link> / Q {item.id}
            </b>{" "}
          </i>
        </div>
        <hr></hr>
        <div className="main-content">
          <div className="info-box">
            <div className="vote-box-content">
              <form onSubmit={votes} encType="multipart/form-data">
                <button className="votes-box">
                  <i className="fa fas fa-heart"></i>
                </button>
                <div className="votes-box-title">
                  <h6>{item.votes_couter} Votes</h6>
                </div>
              </form>
            </div>
            <div className="username-box">
              <h6>Được hỏi bởi: {item.user.username}</h6>
            </div>
            <div className="time-box">
              <h6>Thời gian: {moment(item.created_at).fromNow(true)}</h6>
            </div>
            <div className="category-box">
              <h6>Trong: {item.category_question.name}</h6>
            </div>
          </div>
          <div className="title-question">
            <h3>{item.title}</h3>
          </div>
          <div className="content-question">
            <span>{item.content}</span>
          </div>
          <div className="tag-question">
            <h6 style={{ marginRight: "60px" }}>Tags:</h6>
            <Link
              style={{ textDecoration: "none" }}
              to={`/question/tag/${item.tags.id}`}
            >
              <p>{item.tags.name}</p>
            </Link>

          </div>
          <div className="question-footer">
            <div className="answer-count">
              <h5>
                <i className="fa fa-comment"></i> {item.comments_couter} Câu trả
                lời
              </h5>
            </div>
            <div className="view-count">
              <h5>
                <i className="fa fa-eye"></i> {item.views_couter} Lượt xem
              </h5>
            </div>
            <div className="vote-count">
              <h5>
                <i className="fa fa-heart"></i> {item.votes_couter} Lượt bình chọn
              </h5>
            </div>
            {/* <button className="question-btn-answer">Trả lời câu hỏi</button> */}
          </div>
          <hr></hr>
          {/* <div className="report-footer">
            <div className="report-box">
              <i className="fa fa-flag-checkered"> Báo cáo</i>
            </div>
          </div>
          <hr></hr> */}
        </div>
        <h4>Bình luận gần đây</h4>

        <ViewComment questionId={item.id} />
        <AddComment questionId={item.id} />
      </div>
    );
  });
  return (
    <div>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Chi tiết câu hỏi</h1>
            </div>
          </div>
        </div>
      </header>
      {showQuestion}

      <Footer />
    </div>
  );
}

export default ContentQuestion;
