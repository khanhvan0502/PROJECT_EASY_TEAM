import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const TagManagement = () => {
  const [loading, setLoading] = useState(true);
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState({
    name: "",
  });
  useEffect(() => {
    axios.get(`api/tag`).then((res) => {
      if (res.status === 200) {
        setTagList(res.data.data);
      }
      setLoading(false);
    });
  }, []);
  const deleteTag = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa";

    axios.delete(`api/tag/delete/${id}`).then((res) => {
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
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    });
  };
  const data = {
    name: tag.name,
  };
  const addTag = (e) => {
    e.preventDefault();
    axios.post(`api/tag/add`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", "add tag successful", "success");
        window.location.reload();
        setTag({
          name: "",
        });
      }
      else{
          swal("Error", "tag has been existed", "error");
      }
    });
  };
  var Tag_HTMLTABLE = "";
  if (loading) {
    return <h4>Đang tải trang danh mục...</h4>;
  } else {
    Tag_HTMLTABLE = tagList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteTag(e, item.id)}
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
            Danh sách tag
            {/* <Link
              to="/admin/Tag-question/add"
              className="btn btn-warning btn-sm float-end text-decoration-none"
            >
              Thêm danh mục
            </Link> */}
          </h4>
        </div>
        <div className="card-body">
          <div className="add-Tag">
            <form onSubmit={addTag}>
              <div className="form-group mb-2">
                <label className="form-label">Tên tag </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={tag.name}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-warning px-4 mt-2">
                Thêm
              </button>
            </form>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên tag</th>
                <th>Slug</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{Tag_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;
