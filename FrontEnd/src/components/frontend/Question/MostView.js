import React, { useEffect, useState } from "react";
import ItemQuestion from "./ItemQuestion";
import SearchQuestion from "./SearchQuestion";
import axios from "axios";
function MostView() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/hot-question`).then((res) => {
      if (res.data.status === 400) {
        setQuestion(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);
  return (
    <div>
    
      <div className="question-container">
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
    </div>
  );
}

export default MostView;
