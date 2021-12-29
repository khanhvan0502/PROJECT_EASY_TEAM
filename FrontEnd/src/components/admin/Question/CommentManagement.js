import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const CommentManagement = () => {
  const [loading, setLoading] = useState(true);
  const [CommentList, setCommentList] = useState([]);
  useEffect(() => {
    axios.get(`api/comment`).then((res) => {
      if (res.status === 200) {
        setCommentList(res.data.data);
      }
      setLoading(false);
    });
  }, []);
  const deleteComment = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa";

    axios.delete(`/api/comment/delete/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };
  var Category_HTMLTABLE = "";
  if (loading) {
    return <h4>Đang tải trang danh mục...</h4>;
  } else {
    Category_HTMLTABLE = CommentList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.content}</td>
          <td>{item.user.username}</td>
            <td>{item.question_id}</td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteComment(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Danh sách bình luận
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nội dung</th>
                <th>Username</th>
                <th>ID câu hỏi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{Category_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentManagement;
