import React, { useEffect, useState } from "react";
import "./ItemQuestion.css";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
function ItemQuestion({
  question: {
    id,
    title,
    slug,
    category_question,
    tags,
    user,
    comments_couter,
    votes_couter,
    views_couter,
    created_at,
  },
}) {
  // const [question, setQuestion] = useState({});
  // const viewsCouter = useEffect(() => {
  //   axios.get(`/api/question/${slug}`).then((res) => {
  //     setQuestion(res.data);
  //     console.log(res.data);
  //   });
  // }, []);

  return (
    <>
      <hr style={{ width: "1000px", marginLeft: "50px" }}></hr>

      <div className="container-item-question">
        <div className="vote-box">
          <h5>
            <b className="icon">{votes_couter}</b>
          </h5>
          <p>Votes</p>
        </div>
        <div className="answer-quality-box">
          <h5>
            <b>{comments_couter}</b>
          </h5>
          <p>Answers</p>
        </div>
        <div className="view-box">
          <h5>
            <b>{views_couter}</b>
          </h5>
          <p>Views</p>
        </div>
        <div className="main-box">
          <div className="question-box">
            <h3>
              <Link
                style={{ textDecoration: "none", color: '#273239' }}
                to={`/question/${slug}`}
              >
                {title}
              </Link>
            </h3>
          </div>
          <div className="tag-box">
            <Link
              style={{ textDecoration: "none" }}
              to={`/question/tag/${tags.id}`}
            >
              <p>{tags.name}</p>
            </Link>
          </div>
          <div className="info-box">
            <i className="fas fa-folder-open">
              &nbsp;<Link
                style={{ textDecoration: "none", color: '#273239' }}
                to={`question/category/${category_question.id}`}
              >
                {category_question.name}
              </Link>
            </i>
            <i className="fas fa-user">
              &nbsp;<Link style={{ textDecoration: "none", color: '#273239' }}
                to={`user/${user.username}`}>
                {user.username}
              </Link>
            </i>
            <i className="fas fa-calendar-alt">
              &nbsp;asked {moment(created_at).fromNow(true)} ago
            </i>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemQuestion;
