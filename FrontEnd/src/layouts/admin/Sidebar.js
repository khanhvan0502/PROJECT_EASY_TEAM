import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">MENU</div>
          <Link className="nav-link" to="/admin/dashboard">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt" />
            </div>
            Dashboard
          </Link>
          <Link className="nav-link" to="/admin/profile">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt" />
            </div>
            Quản lý người dùng
          </Link>
          {/* ------------------------------------------------------------------------------------------ */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseQuestionLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý câu hỏi
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseQuestionLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/question">
                Tất cả câu hỏi
              </Link>
              <Link className="nav-link" to="/admin/comment">
                Tất cả bình luận
              </Link>
              <Link className="nav-link" to="/admin/question/category">
                Tất cả danh mục
              </Link>
              <Link className="nav-link" to="/admin/question/tag">
                Tất cả tag
              </Link>
            </nav>
          </div>
          
          {/* ------------------------------------------------------------------------------------------ */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseCategoryLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý danh mục
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseCategoryLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/view-category-quiz">
                Xem danh mục
              </Link>
              <Link className="nav-link" to="/admin/add-category-quiz">
                Thêm danh mục
              </Link>
            </nav>
          </div>
          
          {/* --------------------------------------------------------------- */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseItemLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý item
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseItemLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/view-item-quiz">
                Xem Item
              </Link>
              <Link className="nav-link" to="/admin/add-item-quiz">
                Thêm Item
              </Link>
            </nav>
          </div>
          {/* --------------------------------------------------------------------- */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseQuizLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý quiz
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseQuizLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/view-quiz">
                Xem Quiz
              </Link>
              <Link className="nav-link" to="/admin/add-quiz">
                Thêm Quiz
              </Link>
            </nav>
          </div>
          {/* ------------------------------------------------------ */}

          {/* Quản lý danh mục tin tức */}
          {/* --------------------------------------------------------------------- */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseNews"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý danh mục tin tức
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseNews"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/view-news">
                Xem danh mục tin tức
              </Link>
              <Link className="nav-link" to="/admin/add-news">
                Thêm danh mục tin tức
              </Link>
            </nav>
          </div>
          {/* ------------------------------------------------------ */}

          {/* Quản lý tin tức */}
          {/* --------------------------------------------------------------------- */}
          <Link className="nav-link collapse" to="#"
            data-toggle="collapse"
            data-target="#collapseNewsItem"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Quản lý tin tức
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseNewsItem"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/view-news-item">
                Xem tin tức
              </Link>
              <Link className="nav-link" to="/admin/add-news-item">
                Thêm tin tức
              </Link>
            </nav>
          </div>
          {/* ------------------------------------------------------ */}
          
         
          <div
            className="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-bs-parent="#sidenavAccordion"
          >
            <nav
              className="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            >
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseAuth"
                aria-expanded="false"
                aria-controls="pagesCollapseAuth"
              >
                Authentication
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseAuth"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="login.html">
                    Login
                  </Link>
                  <Link className="nav-link" to="register.html">
                    Register
                  </Link>
                  <Link className="nav-link" to="password.html">
                    Forgot Password
                  </Link>
                </nav>
              </div>
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseError"
                aria-expanded="false"
                aria-controls="pagesCollapseError"
              >
                Error
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseError"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="401.html">
                    401 Page
                  </Link>
                  <Link className="nav-link" to="404.html">
                    404 Page
                  </Link>
                  <Link className="nav-link" to="500.html">
                    500 Page
                  </Link>
                </nav>
              </div>
            </nav>
          </div>
          <div className="sb-sidenav-menu-heading">Addons</div>
          <Link className="nav-link" to="charts.html">
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area" />
            </div>
            Charts
          </Link>
          <Link className="nav-link" to="tables.html">
            <div className="sb-nav-link-icon">
              <i className="fas fa-table" />
            </div>
            Tables
          </Link>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  );
};

export default Sidebar;
