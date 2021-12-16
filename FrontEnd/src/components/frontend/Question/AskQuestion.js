import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import "./AskQuestion.css";
import Footer from "../../../layouts/frontend/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddTag from "../Tag/AddTag";
function ViewQuestion() {
  const [categoryQuestionList, setCategoryQuestionList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const history = useHistory();
  const [questionInput, setQuestionInput] = useState({
    title: "",
    category_question_id: "",
    content: "",
    tag_id: "",
  });

  const [errorList, setErrorList] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setQuestionInput({ ...questionInput, [e.target.name]: e.target.value });
  };

  // Get list category question
  useEffect(() => {
    axios.get(`api/get-all-category-question`).then((res) => {
      setCategoryQuestionList(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  // Get list tag
  useEffect(() => {
    axios.get(`api/get-all-tag`).then((res) => {
      setTagList(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const submitQuestion = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", questionInput.title);
    formData.append("category_question_id", questionInput.category_question_id);
    formData.append("content", questionInput.content);
    formData.append("tag_id", questionInput.tag_id);
    // formData.append("count_view", questionInput.count_view);
    // formData.append("count_answer", questionInput.count_answer);
    // formData.append("count_vote", questionInput.count_vote);

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/store-question`, formData).then((res) => {
        if (res.data.status === 200) {
          swal("Success", "Your question has been posted", "success");
          history.push("/question");
          setErrorList([]);
        } else {
          swal("All Fields are mandatory", "", "error");
          setErrorList(res.data.errors);
        }
      });
    });
  };
  const AddTag1 = () => {
    alert("Hello");
  };

  const AddTag = (e) => {
    e.preventDefault();
    AddTag();
  }

  return (
    <div>
      <Navbar />
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Đặt câu hỏi</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="question-container">
        <div className="hint">
          <p>
            {" "}
            Hãy đặt câu hỏi phỏng vấn liên quan đến công việc của bạn sắp tới.
            Lưu ý,{" "}
            <b
              style={{
                color: "red",
                fontSize: "24px",
              }}
            >
              *
            </b>{" "}
            là thành phần bắt buộc
          </p>
        </div>
        <div className="main-form">
          <form onSubmit={submitQuestion} encType="multipart/form-data">
            <div className="form-group">
              <label>
                Tiêu đề{" "}
                <b
                  style={{
                    color: "red",
                    fontSize: "24px",
                  }}
                >
                  *
                </b>
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInput}
                value={questionInput.title}
                className="form-control"
                placeholder="Nhập tiêu đề câu hỏi"
              />
            </div>

            <div className="note">
              <p>
                Vui lòng đặt tiêu đề thích hợp cho câu hỏi để người khác được
                trả lời dễ dàng hơn.
              </p>
            </div>
            {/* Create category */}
            <div className="form-group">
              <label>
                Danh mục câu hỏi{" "}
                <b
                  style={{
                    color: "red",
                    fontSize: "24px",
                  }}
                >
                  *
                </b>
              </label>
              <div className="category-container">
              <select
                name="category_question_id"
                onChange={handleInput}
                value={questionInput.category_question_id}
                className="form-control"
              >
                <option>Chọn danh mục</option>
                {categoryQuestionList.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <button className="add-category-btn form-control-submit-button" onClick={AddTag1}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <p>Vui lòng chọn danh mục thích hợp</p>
            {/* End create category */}
            <div class="form-group">
              <label for="">Nội dung</label>
              <textarea
                class="form-control"
                name="content"
                onChange={handleInput}
                value={questionInput.content}
                rows="3"
                placeholder="Nội dung/Đoạn code"
              ></textarea>
            </div>
            <p>Bạn có thể không nhập nội dung</p>
            {/* Create a tag*/}
            <div className="form-group">
              <label>
                Tag{" "}
                <b
                  style={{
                    color: "red",
                    fontSize: "24px",
                  }}
                >
                  *
                </b>
              </label>
              <div className="tag-container">
                <select
                  name="tag_id"
                  onChange={handleInput}
                  value={questionInput.tag_id}
                  className="form-control"
                >
                  <option>Chọn tag</option>
                  {tagList.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <button className="add-tag-btn form-control-submit-button" onClick={AddTag}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <p>Vui lòng chọn tag phù hợp với câu hỏi</p>
            {/* End create a tag*/}
            {/* Create a ask question button*/}
            <div className="form-group">
              <button type="submit" className="form-control-submit-button">
                Đặt câu hỏi
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewQuestion;
