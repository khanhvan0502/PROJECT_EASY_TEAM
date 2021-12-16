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
  const [question, setQuestion] = useState({});
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
            <b>{votes_couter}</b>
          </h5>
          <p>votes</p>
        </div>
        <div className="answer-quality-box">
          <h5>
            <b>{comments_couter}</b>
          </h5>
          <p>answers</p>
        </div>
        <div className="view-box">
          <h5>
            <b>{views_couter}</b>
          </h5>
          <p>views</p>
        </div>
        <div className="main-box">
          <div className="question-box">
            <h3>
              <Link 
              style={{ textDecoration: "none", 
                             color:"#f25c05" }} to={`/question/${slug}`}>
                {title}
              </Link>
            </h3>
          </div>
          <div className="tag-box">
            <p>{tags.name}</p>
          </div>
          <div className="info-box">
            <i className="fas fa-stream">{category_question.name}</i>
            <i className="fas fa-user">{user.username}</i>
            <i className="fas fa-calendar-alt">
              asked {moment(created_at).fromNow(true)} ago
            </i>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemQuestion;
