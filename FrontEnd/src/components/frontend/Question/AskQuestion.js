import React, { useEffect, useRef, useState } from "react";

import Navbar from "../../../layouts/frontend/Navbar";
import "./AskQuestion.css";
import Footer from "../../../layouts/frontend/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
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


  return (
    <div>
      <Navbar />
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">?????t c??u h???i</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container" style={{ fontSize: '30px' }}>
        <div className="row">
          <p className="text-center" style={{ fontSize: '18px' }}>
            {" "}
            H??y ?????t c??u h???i ph???ng v???n li??n quan ?????n c??ng vi???c c???a b???n s???p t???i.
            L??u ??,{" "}
            <b
              style={{
                color: "red",
                fontSize: "24px",
              }}
            >
              *
            </b>{" "}
            l?? th??nh ph???n b???t bu???c
          </p>
        </div>
        <div className="row">
          <form onSubmit={submitQuestion} encType="multipart/form-data">
            <div className="form-group">
              <label>
                Ti??u ?????{" "}
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
                style={{ fontSize: '18px' }}
                type="text"
                name="title"
                onChange={handleInput}
                value={questionInput.title}
                className="form-control"
                placeholder="Nh???p ti??u ????? c??u h???i"
              />
            </div>

            <div className="note">
              <p style={{ fontSize: '18px' }}>
                Vui l??ng ?????t ti??u ????? th??ch h???p cho c??u h???i ????? ng?????i kh??c ???????c
                tr??? l???i d??? d??ng h??n.
              </p>
            </div>
            {/* Create category */}
            <div className="form-group">
              <label>
                Danh m???c c??u h???i{" "}
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
                  style={{ fontSize: '18px' }}
                  name="category_question_id"
                  onChange={handleInput}
                  value={questionInput.category_question_id}
                  className="form-control"
                >
                  <option>Ch???n danh m???c</option>
                  {categoryQuestionList.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

              </div>
            </div>
            <p style={{ fontSize: '18px' }}>Vui l??ng ch???n danh m???c th??ch h???p</p>
            {/* End create category */}
            <div class="form-group">
              <label for="">N???i dung</label>
              <textarea
                style={{ fontSize: '18px' }}
                class="form-control"
                name="content"
                onChange={handleInput}
                value={questionInput.content}
                rows="3"
                placeholder="nh???p n???i dung"
              ></textarea>
              {/* <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              /> */}
            </div>
            <p style={{ fontSize: '18px' }}>B???n c?? th??? kh??ng nh???p n???i dung</p>
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
                  <option style={{ fontSize: '18px' }}>Ch???n tag</option>
                  {tagList.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

              </div>
            </div>
            <p style={{ fontSize: '18px' }}>Vui l??ng ch???n tag ph?? h???p v???i c??u h???i</p>
            {/* End create a tag*/}
            {/* Create a ask question button*/}
            <div className="form-group">
              <button type="submit" className="form-control-submit-button" style={{ fontSize: '24px' }}>
                ?????t c??u h???i
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
