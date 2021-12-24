import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import ViewQuestion from "./ViewQuestion";
import MostView from "./MostView";
import Footer from "../../../layouts/frontend/Footer";

import { Link } from "react-router-dom";
import "./AllQuestion.css";
import SearchQuestion from "./SearchQuestion";
const AllQuestion = () => {
  return (
    <div>
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
      <SearchQuestion/>
      <div className="main-container">
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
        {/* <MostView/> */}
      </div>
     
      <Footer />
    </div>
  );
};

export default AllQuestion;
