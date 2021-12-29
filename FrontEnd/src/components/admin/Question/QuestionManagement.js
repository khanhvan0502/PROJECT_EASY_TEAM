
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function QuestionManagement() {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    axios.get(`/api/question`).then((res) => {
      if (res.data.status === 200) {
        setQuestionList(res.data.data);
        console.log(res.data.data);
      }
      setLoading(false);
    });
  }, []);
  const deleteQuestion = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa";

    axios.delete(`/api/question/delete/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };
  var Profile_HTMLTABLE = "";
  if (loading) {
    return <h4>Đang tải trang danh mục...</h4>;
  } else {
    Profile_HTMLTABLE = questionList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.title}</td>
          <td>{item.content}</td>
          <td>{item.category_question.name}</td>
          <td>{item.tags.name}</td>
          <td>{item.user.username}</td>
          <td>
          <button
              type="button"
              onClick={(e) => deleteQuestion(e, item.id)}
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
            Danh sách câu hỏi
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Danh mục</th>
                <th>Tag</th>
                {/* <th>Votes</th>
                <th>Comments</th>
                <th>Views</th> */}
                <th>Người đăng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{Profile_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default QuestionManagement;
