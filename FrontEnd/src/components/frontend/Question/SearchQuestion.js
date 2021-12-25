import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchQuestion.css";
import ItemQuestion from "./ItemQuestion";
function SearchQuestion() {
  const [searchInput, setSearchInput] = useState({
    name: "",
  });
  const handleInput = (e) => {
    e.persist();
    setSearchInput({ ...setSearchInput, [e.target.name]: e.target.value });
  };
  const [searchQuestion, setSearchQuestion] = useState([]);
  useEffect(() => {
    axios.get(`/api/question/search/${searchInput.name}`).then((res) => {
      setSearchQuestion(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  return (
    <div className="container">
      <form className="search-question-container">
        <div className="input-group">
          <input
            name="query"
            className="form-control search-input"
            type="text"
            placeholder="Bạn muốn hỏi gì"
            onChange={handleInput}
            value={searchInput.name}
          />
          <button className="btn search-btn" id="btnNavbarSearch" type="submit">
            <i className="fas fa-search icon-btn" />
          </button>
        </div>
      </form>
      <div className="search-result">
        {searchQuestion.map((item) => (
          <ItemQuestion key={item.id} question={item} />
        ))}
      </div>
    </div>
  );
}

export default SearchQuestion;
