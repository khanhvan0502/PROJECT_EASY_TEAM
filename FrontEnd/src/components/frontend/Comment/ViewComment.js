import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemComment from "./ItemComment";
function ViewComment({ questionId }) {
  console.log(questionId);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    axios.get(`/api/all-comment/${questionId}`).then((res) => {
      setComment(res.data.data);
    });
  }, []);
  console.log("Comment data:", comment);
  return (
    <div>
      {comment.map((item) => (
        <ItemComment key={item.id} comment={item} />
      ))}
    </div>
  );
}
export default ViewComment;
