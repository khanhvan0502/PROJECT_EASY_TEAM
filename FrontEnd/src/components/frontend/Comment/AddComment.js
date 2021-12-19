import React, { useState, useHistory } from "react";
import swal from "sweetalert";
import "../Question/ContentQuestion.css";
import axios from "axios";
function AddComment() {
  const [commentInput, setCommentInput] = useState({
    content: "",
  });
  const [errorList, setErrorList] = useState([]);
  const history = useHistory();
  const handleInput = (e) => {
    e.persist();
    setCommentInput({ ...commentInput, [e.target.name]: e.target.value });
  };
  const submitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", commentInput.content);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/store-comment`, formData).then((res) => {
        if (res.data.status === 200) {
          swal("Thành công", "Bình luận đã được gửi", "success");
          setErrorList([]);
        } else {
          swal("Thất bại", "Bình luận chưa được gửi", "error");
          setErrorList(res.data.errors);
        }
      });
    });
  };

  return (
    <div className="comment-container">
      <div className="leave-comment">
        <h6>Leave a comment</h6>
      </div>
      <form onSubmit={submitComment} encType="multipart/form-data">
        <div class="form-group">
          <label for="">Nội dung</label>
          <textarea
            class="form-control"
            name="content"
            onChange={handleInput}
            value={commentInput.content}
            rows="5"
            placeholder="Nội dung"
          ></textarea>
          
        </div>
        <div className="form-group">
          <button type="submit" className="form-control-submit-button">
            Bình luận
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
