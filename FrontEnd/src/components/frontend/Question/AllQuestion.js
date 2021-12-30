import React, {useState} from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import ViewQuestion from "./ViewQuestion";
import MostView from "./MostView";
import Footer from "../../../layouts/frontend/Footer";

import { Link } from "react-router-dom";
import "./AllQuestion.css";
import SearchQuestion from "./SearchQuestion";
const AllQuestion = () => {
  const [inputSearch, setInputSearch] = useState("");
  const handleInput = (e) => {
    e.persist();
    setInputSearch(e.target.value);

  };


  return (
    <>
      <Navbar />

      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Tất cả câu hỏi</h1>
            </div>
          </div>
        </div>
      </header>


      {/* Search */}
      <div className="container">
        <form className="search-question-container">
          <div className="input-group">
            <input
              name="query"
              className="form-control search-input"
              type="text"
              placeholder="Bạn muốn hỏi gì"
              onChange={handleInput}
              value={inputSearch}
              
            />
            <button
              className="btn search-btn"
              type="submit"
            >
              <Link to={`/question/search/${inputSearch}`}>

              <i className="fas fa-search icon-btn" />
              </Link>
            </button>
          </div>
        </form>
      </div>
      {/* --------------------------------------------------- */}
      <div className="main-container">
        <button type="submit" className="btn-ask-question">
          <Link
            to="/ask-question"
            style={{ textDecoration: "none", color: "white" }}
          >
            <i
              className="fas fa-plus-circle"
              style={{ marginRight: "10px" }}
            ></i>
            Đặt câu hỏi
          </Link>
        </button>

        <div className="choice-question-box">
          <div className="lastest-box">
            <div className="title-box">
              <h6>Mới nhất</h6>
            </div>
          </div>
          <div className="most-view-box">
            <div className="title-box">
              
              
              <h6>Xem nhiều nhất</h6>
            </div>
          </div>
          <div className="most-answer-box">
            <div className="title-box">
              <h6>Trả lời nhiều nhất</h6>
            </div>
          </div>
          <div className="most-vote-box">
            <div className="title-box">
              <h6>Bình chọn nhiều nhất</h6>
            </div>
          </div>
        </div>

        <ViewQuestion />
      </div>

      <Footer />
    </>
  );
};
export default AllQuestion;
