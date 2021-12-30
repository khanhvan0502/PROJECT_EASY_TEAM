import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchQuestion.css";
import ItemQuestion from "./ItemQuestion";
import { useLocation } from "react-router-dom";
function SearchQuestion() {
  const [questionList, setQuestionList] = useState([]);
  const input =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  console.log(input);
  useEffect(() => {
    axios.get(`/api/question/search/${input}`).then((res) => {
      if(res.data.status === 400){
        setQuestionList(res.data.data);
        console.log(res.data.data);
      }else{
        setQuestionList(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);

  return (
    <div>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Tìm kiếm câu hỏi</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="question-container">
        {questionList.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
    </div>
  );
}

export default SearchQuestion;
