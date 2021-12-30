import React from 'react'
import { Link } from 'react-router-dom'
const Filter = () => {
  return (
    <div>
      <div className="choice-question-box">
        <div className="lastest-box">
          <div className="title-box">
            <Link className='text-decoration-none' to={`/question`}>
              <h6>Mới nhất</h6>
            </Link>
          </div>
        </div>
        <div className="most-view-box">
          <div className="title-box">
            <Link className='text-decoration-none' to="/questions/most-view">
              <h6>Xem nhiều nhất</h6>
            </Link>
          </div>
        </div>
        <div className="most-answer-box">
          <div className="title-box">
            <h6>Bình luận nhiều nhất</h6>
          </div>
        </div>
        <div className="most-vote-box">
          <div className="title-box">
            <h6>Bình chọn nhiều nhất</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
