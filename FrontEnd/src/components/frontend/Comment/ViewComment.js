import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemComment from "./ItemComment";
function ViewComment({ questionId }) {
  console.log(questionId);
  const [comment, setComment] = useState([]);
  const [countComment, setCountComment] = useState(0);
  const countCommentInput = {
    question_id: questionId,
    comments_couter: countComment,
  };

  useEffect(() => {
    axios.get(`/api/all-comment/${questionId}`).then((res) => {
      setComment(res.data.data);
      setCountComment(res.data.data.length);
    });
  }, []);

  axios
    .post(`/api/question/save-comments-couter`, countCommentInput)
    .then((res) => {
    });
  return (
    <div style={{marginBottom:"30px"}}>
      {comment.map((item) => (
        <ItemComment key={item.id} comment={item} />
      ))}
    </div>
  );
}
export default ViewComment;
