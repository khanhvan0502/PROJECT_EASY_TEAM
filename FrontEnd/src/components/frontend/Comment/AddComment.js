import React, { useState } from "react";
import swal from "sweetalert";
import { useHistory } from 'react-router-dom'
import "../Question/ContentQuestion.css";
import axios from "axios";

function AddComment({ questionId }) {
  const history = useHistory();
  console.log(questionId);
  const [commentInput, setCommentInput] = useState({
    question_id: questionId,
    content: "",
  });
  const [errorList, setErrorList] = useState([]);


  const handleInput = (e) => {
    e.persist();
    setCommentInput({ ...commentInput, [e.target.name]: e.target.value });
  };
  const submitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("question_id", commentInput.question_id);
    formData.append("content", commentInput.content);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/store-comment`, formData).then((res) => {
        if (res.data.status === 200) {
          swal("Success!", "Comment has been added!", "success");
          setErrorList([]);
          window.location.reload();
        } else {
          swal("Error!", "Please login to add comment!", "error");
          history.push("/login");
          setErrorList(res.data.errors);
        }
      });
    });
  };

  return (
    <div className="comment-container">
      <div className="leave-comment">
        <h4>Bình luận của bạn</h4>
      </div>
      <form encType="multipart/form-data" onSubmit={submitComment}>
        <div className="form-group" >
          <input type="hidden" onChange={handleInput} value={commentInput.question_id}
          />

        </div>
        <div className="form-group">
          {/* <label for="">Nội dung</label> */}
          <textarea
            className="form-control"
            name="content"
            value={commentInput.content}
            onChange={handleInput}
            rows="5"
          // placeholder="Nội dung"
          ></textarea>

        </div>
        <div className="form-group">
          <button type="submit" className="form-control-submit-button" style={{ fontSize: '22px' }}>
            Bình luận
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
