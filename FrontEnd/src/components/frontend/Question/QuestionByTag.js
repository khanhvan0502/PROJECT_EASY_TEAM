import React, { useEffect, useState } from "react";

import ItemQuestion from "./ItemQuestion";

import SearchQuestion from "./SearchQuestion";
import axios from "axios";
import Footer from "../../../layouts/frontend/Footer";import { useLocation } from "react-router-dom";

function QuestionByTag() {
    const id = useLocation().pathname.split("/")[
        useLocation().pathname.split("/").length - 1
    ];
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/question/tag/${id}`).then((res) => {
      if (res.data.status === 400) {
        setQuestion(res.data.data);
      }
    });
  }, []);
  return (
    <div>
      
      {/* <SearchQuestion/> */}
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Câu hỏi theo tag</h1>
            </div>
          </div>
        </div>
      </header>
      
      <div className="question-container">
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default QuestionByTag;
