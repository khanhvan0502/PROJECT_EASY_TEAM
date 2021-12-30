import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Register() {
  const history = useHistory();

  const [registerInput, setRegister] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role_as: "0",
    error_list: [],
  });

  const handleInput = (event) => {
    event.persist();
    setRegister({ ...registerInput, [event.target.name]: event.target.value });
  };

  const registerSubmit = (event) => {
    event.preventDefault();

    const data = {
      fullname: registerInput.fullname,
      username: registerInput.username,
      email: registerInput.email,
      password: registerInput.password,
      phone: registerInput.phone,
      role_as: registerInput.role_as,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          history.push("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />

      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1 className="text-center">Đăng ký </h1>
            </div>
          </div>
        </div>
      </header>

      {/* start sign up */}

      <div className="ex-form-1 pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3">
              <div className="text-box mt-5 mb-5">
                <p className="mb-4">
                  Điền vào biểu mẫu dưới đây để đăng ký dịch vụ. Đã đăng ký? Sau đó chỉ cần&nbsp;
                  <Link className="blue" to="/login">
                    đăng nhập
                  </Link>
                </p>
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Tên đầy đủ</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={handleInput}
                      value={registerInput.fullname}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.fullname}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Tên tài khoản</label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleInput}
                      value={registerInput.username}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.username}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={registerInput.email}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={registerInput.password}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleInput}
                      value={registerInput.phone}
                      className="form-control"
                    />
                    <span>{registerInput.error_list.phone}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="form-control-submit-button"
                      style={{ fontSize: '18px' }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default Register;
