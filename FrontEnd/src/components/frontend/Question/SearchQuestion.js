import React from "react";
import "./ItemQuestion.css";
const SearchQuestion = () => {
    
  return (
    <div className="search-container">
      <form>
        <input
          className="form-control search-input"
          type="text"
          placeholder="Bạn muốn tìm gì?"
        />
      </form>
    </div>
  );
};

export default SearchQuestion;
