import React, { useState, useEffect } from "react";
import Footer from "../../../layouts/frontend/Footer";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const UserProfile = () => {
  const username =
    useLocation().pathname.split("/")[
    useLocation().pathname.split("/").length - 1
    ];
  console.log(username);
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    axios.get(`api/user/${username}`).then((res) => {
      if (res.data.status === 200) {
        setProfileList(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);

  var showProfile = "";
  showProfile = profileList.map((item) => {
    return (
      <div className="profile-container">
        <div className="left-container">
          <div className="avatar">
            <img
              src="https://gtjai.com.vn/wp-content/uploads/2021/07/avt.png"
              alt="avatar"
            />
            <div className="full-name">
              <h4>{item.fullname}</h4>
            </div>
            <Link to={`/user/${username}/change-password`}>
            <i
              className="fas fa-edit"
              style={{ fontSize: "30px", marginTop: "20px" }}
            />
            </Link>
          </div>
        </div>
        <div className="right-container">
          <h4>Thông tin cá nhân</h4>
          <hr></hr>
          <div className="fullname">
            <h5>Họ và tên</h5>
            <h6>{item.fullname}</h6>
          </div>
          <div className="username">
            <h5>Tên đăng nhập</h5>
            <h6>{item.username}</h6>
          </div>
          <div className="email">
            <h5>Email</h5>
            <h6>{item.email}</h6>
          </div>
          <div className="phone">
            <h5>Số điện thoại</h5>
            <h6>{item.phone}</h6>
          </div>
          <div className="created_at">
            <h5>Ngày tạo tài khoản</h5>
            <h6>{item.created_at}</h6>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Xem thông tin cá nhân</h1>
            </div>
          </div>
        </div>
      </header>

      {showProfile}
      
      {/* <div className="container">
      <hr></hr>
      <h3>Câu hỏi đã đặt</h3>
      </div> */}
      
      <Footer />
    </>
  );
};

export default UserProfile;
