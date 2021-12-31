import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Search from "../../components/frontend/features/Search";

function Navbar() {
  const history = useHistory();

  const logoutSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <span className="nav-item">
          <Link className="btn-outline-sm" to="/login">
            Đăng nhập
          </Link>
        </span>
        <span className="nav-item">
          <Link className="btn-outline-sm" to="/register">
            Đăng ký
          </Link>
        </span>
      </ul>
    );
  } else {
    AuthButtons = (
      <ul className="navbar-nav">
        <div className="nav-item">
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw" />
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                
                <li>
                  <Link className="dropdown-item" to={`/user/${localStorage.getItem("auth_name")}`}>
                    Xem thông tin tài khoản
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" to={`/user/${localStorage.getItem("auth_name")}/edit`}>
                    Sửa thông tin
                  </Link>
                </li> */}
                {/* <li>
                  <Link className="dropdown-item" to="#!">
                    Xem câu hỏi đã đặt
                  </Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" to={`/user/${localStorage.getItem("auth_name")}/change-password`}>
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <span className="nav-item">
          <button
            type="button"
            onClick={logoutSubmit}
            className="btn-outline-sm"
          >
            Đăng xuất
          </button>
        </span>
      </ul>
    );
  }

  return (
    <div>
      <nav
        id="navbarExample"
        className="navbar navbar-expand-lg fixed-top navbar-light"
        aria-label="Main navigation"
      >
        <div className="container">
          <Link className="navbar-brand logo-image" to="/">
            <img
              className="logotobig"
              src="../../images/logo_5000.png"
              alt="ImageLogo"
            />
          </Link>
          <button
            className="navbar-toggler p-0 border-0"
            type="button"
            id="navbarSideCollapse"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="navbar-collapse offcanvas-collapse"
            id="navbarsExampleDefault"
          >
            <ul className="navbar-nav ms-auto navbar-nav-scroll">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/question">
                  Câu hỏi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/listquiz">
                  Làm bài thi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Tìm kiếm
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#statistical">
                  Thống kê
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="#tips">
                  Mẹo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
              </li>
              {/* <li className="nav-item">
                                <Link className="nav-link" to="#pricing">Pricing</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Drop</Link>
                                <ul className="dropdown-menu" aria-labelledby="dropdown01">
                                    <li><Link className="dropdown-item" to="article.html">Article Details</Link></li>
                                    <li><div className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="terms.html">Terms Conditions</Link></li>
                                    <li><div className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="privacy.html">Privacy Policy</Link></li>
                                </ul>
                            </li> */}
            </ul>
            {AuthButtons}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
