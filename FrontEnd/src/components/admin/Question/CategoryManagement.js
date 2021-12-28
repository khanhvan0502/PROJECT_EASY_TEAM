import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const CategoryManagement = () => {
  const [loading, setLoading] = useState(true);
  const [CategoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState({
    name: "",
  });
  useEffect(() => {
    axios.get(`api/category-question`).then((res) => {
      if (res.status === 200) {
        setCategoryList(res.data.data);
      }
      setLoading(false);
    });
  }, []);
  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa";

    axios.delete(`api/category-question/delete/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };
  const handleInput = (e) => {
    e.persist();
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  const data = {
    name: category.name,
  };
  const addCategory = (e) => {
    e.preventDefault();
    axios.post(`api/category-question/add`,data).then((res) => {
      if (res.data.status === 200) {
        setCategory({
          name: "",
          });
        swal("Success", res.data.message, "success");
        window.location.reload();
      }
    });
  };
  var Category_HTMLTABLE = "";
  if (loading) {
    return <h4>Đang tải trang danh mục...</h4>;
  } else {
    Category_HTMLTABLE = CategoryList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Danh sách danh mục câu hỏi
            {/* <Link
              to="/admin/category-question/add"
              className="btn btn-warning btn-sm float-end text-decoration-none"
            >
              Thêm danh mục
            </Link> */}
          </h4>
        </div>
        <div className="card-body">
          <div className="add-category">
            <form onSubmit={addCategory}>
              
            <div className="form-group mb-2">
              <label className="form-label">Tên danh mục </label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                value={category.name}
                className="form-control"
              />
            </div>
              <button type="submit" className="btn btn-warning px-4 mt-2">Thêm</button>

            </form>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{Category_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
