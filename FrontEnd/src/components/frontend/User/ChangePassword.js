import React, { useState, useEffect, useHistory } from "react";
import Footer from "../../../layouts/frontend/Footer";
import "./styles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const ChangePassword = () => {
  const username =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 2
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
  const [passwordList, setPasswordList] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
    error_list: [],
  });
  const [errorList, setErrorList] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setPasswordList({ ...passwordList, [e.target.name]: e.target.value });
  };
  const submitChangePassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("old_password", passwordList.old_password);
    formData.append("password", passwordList.password);
    formData.append("confirm_password", passwordList.confirm_password);
    axios.post(`api/user/${username}/change-password`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Thay đổi mật khẩu thành công", "", "success");
      } else {
        swal("Thay đổi mật khẩu thất bại", res.data.message, "error");
        setPasswordList({
          ...passwordList,
          error_list: res.data.error_list,
        });
      }
    });
  };
  var showProfile = "";
  showProfile = profileList.map((item) => {
    return (
      <>
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
              <Link to={`/user/${username}`}>
              <i
                className="fas fa-user"
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
              </Link>
            </div>
          </div>
          <div className="right-container">
            <h4>Đổi mật khẩu</h4>
            <hr></hr>
            <form onSubmit={submitChangePassword}>
              <div className="form-group">
                <h5>
                  Mật khẩu cũ{" "}
                  <b style={{ color: "red", fontSize: "24px" }}>*</b>
                </h5>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  className="old-password"
                  name="old_password"
                  onChange={handleInput}
                  value={passwordList.old_password}
                />
                <span>{passwordList.error_list}</span>
              </div>
              <div className="form-group">
                <h5>
                  Mật khẩu mới{" "}
                  <b style={{ color: "red", fontSize: "24px" }}>*</b>
                </h5>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="new-password"
                  name="password"
                  onChange={handleInput}
                  value={passwordList.password}
                />
                <span>{passwordList.error_list}</span>
              </div>
              <div className="form-group">
                <h5>
                  Xác nhận mật khẩu{" "}
                  <b style={{ color: "red", fontSize: "24px" }}>*</b>
                </h5>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  className="confirm-password"
                  name="confirm_password"
                  onChange={handleInput}
                  value={passwordList.confirm_password}
                />
                <span>{passwordList.error_list}</span>
              </div>

              <div className="btn-change-password">
                <button className="btn-change-password form-control-submit-button">
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Đổi mật khẩu</h1>
            </div>
          </div>
        </div>
      </header>

      {showProfile}
      <Footer />
    </>
  );
};

export default ChangePassword;
