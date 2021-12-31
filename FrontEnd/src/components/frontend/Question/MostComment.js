import React, { useEffect, useState } from "react";
import ItemQuestion from "./ItemQuestion";
import axios from "axios";
import Filter from "./Filter";
import Footer from "../../../layouts/frontend/Footer";
import ScrollButton from "../../../layouts/frontend/ScrollButton";
function MostComment() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/questions/most-comment`).then((res) => {
      if (res.data.status === 400) {
        setQuestion(res.data.data);
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
              <h1 className="text-center">Bình luận nhiều nhất</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <Filter />
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
      <ScrollButton />
      <Footer />
    </div>
  );
}

export default MostComment;
