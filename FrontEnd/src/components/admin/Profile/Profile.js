
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    axios.get(`api/profile`).then((res) => {
      if (res.status === 200) {
        setProfileList(res.data);
      }
      setLoading(false);
    });
  }, []);
  const deleteProfile = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa";

    axios.delete(`/api/profile/delete/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };
  var Profile_HTMLTABLE = "";
  if (loading) {
    return <h4>Đang tải trang danh mục...</h4>;
  } else {
    Profile_HTMLTABLE = profileList.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.fullname}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>
            {item.role_as === "1" ? (
              <span class="badge badge-info">Admin</span>
            ) : (
              <span class="badge badge-warning">User</span>
            )}
          </td>
          <td>
            <Link
              to={`profile/edit/${item.id}`}
              className="btn btn-success btn-sm text-decoration mr-10"
            >
              Sửa
            </Link>

            <button
              type="button"
              onClick={(e) => deleteProfile(e, item.id)}
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
            Danh sách người dùng
            <Link
              to="/admin/profile/add"
              className="btn btn-primary btn-sm float-end text-decoration-none"
            >
              Thêm người dùng
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{Profile_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Profile;
