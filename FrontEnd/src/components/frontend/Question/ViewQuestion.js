import React, { useEffect, useState } from "react";

import ItemQuestion from "./ItemQuestion";

import axios from "axios";
function ViewQuestion() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios.get(`api/get-all-question`).then((res) => {
      if (res.data.status === 400) {
        setQuestion(res.data.data);
      }
    });
  }, []);
  
  return (
    <div>
      
      
      <div className="container mb-5">
        {question.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
      
    </div>
  );
}

export default ViewQuestion;
