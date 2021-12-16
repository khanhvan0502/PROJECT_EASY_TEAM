import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import ItemQuestion from "./ItemQuestion";
import Footer from "../../../layouts/frontend/Footer";
import SearchQuestion from "./SearchQuestion";
import axios from "axios";
function ViewQuestion() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/get-all-question`).then((res) => {
      if (res.data.status === 400) {
        setQuestion(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);
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
      {/* <SearchQuestion/> */}
      <div className="question-container">
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ViewQuestion;
