import axios from "axios";
import React from "react";
import "./ItemComment.css";
function ItemComment({
  comment: { id, content, user, count_votes, created_at },
}) {
  const votes = (e) => {
    e.preventDefault();
    console.log("ID:", id);
    axios.post(`/api/comment/save-votes`, { id: id }).then((res) => {
        window.location.reload();
    });
  };
  return (
    <div className="item-comment-container">
      <hr></hr>

      <div className="comment-votes">
        <form onSubmit={votes}>
          <button className="comment-votes-box">
            <i className="fa fas fa-heart"></i>
            <div className="comment-votes-box-title">
              <h6>{count_votes}</h6>
            </div>
          </button>
        </form>
      </div>
      <div className="comment-main">
        <div className="comment-content">
          <span>{content}</span>
        </div>
        <div className="comment-name">
          <h6>{user.username}</h6>
        </div>
        <div className="comment-time">
          <h6>Trả lời lúc: {created_at}</h6>
        </div>
      </div>
    </div>
  );
}

export default ItemComment;
