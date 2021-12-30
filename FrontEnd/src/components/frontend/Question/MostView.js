import React, { useEffect, useState } from "react";
import ItemQuestion from "./ItemQuestion";
import axios from "axios";
import SearchResult from "./SearchResult";
import Filter from "./Filter";
function MostView() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/questions/most-view`).then((res) => {
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
              <h1 className="text-center">Xem nhiều nhất</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <Filter />
      </div>
      <div className="container">
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
    </div>
  );
}

export default MostView;
