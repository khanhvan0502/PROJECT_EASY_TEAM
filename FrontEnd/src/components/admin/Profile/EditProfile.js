// import React from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";

// class EditProfile extends React.Component {
//   render() {
//     return (
//       <div>
//         <Modal
//           isOpen={this.props.editUserModal}
//           toggle={this.props.toggleEditUserModal}
//         >
//           <ModalHeader toggle={this.props.toggleEditUserModal}>
//             Update User
//           </ModalHeader>
//           <ModalBody>
//             <FormGroup>
//               <Label for="fullname">Họ và tên</Label>
//               <Input
//                 id="fullname"
//                 name="fullname"
//                 value={this.props.editUserData.fullname}
//                 onChange={this.props.onChangeEditUserHanler}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="username">Username</Label>
//               <Input
//                 id="username"
//                 name="username"
//                 value={this.props.editUserData.username}
//                 onChange={this.props.onChangeEditUserHanler}
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 value={this.props.editUserData.email}
//                 onChange={this.props.onChangeEditUserHanler}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 value={this.props.editUserData.phone}
//                 onChange={this.props.onChangeEditUserHanler}
//               />
//             </FormGroup>
//             <FormGroup check>
//               <Label check>
//                 <Input type="checkbox" /> Admin
//               </Label>
//             </FormGroup>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={this.props.updateUser}>
//               Update
//             </Button>
//             <Button color="secondary" onClick={this.props.toggleEditUserModal}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }
// export default EditProfile;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function EditProfile(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    axios.get(`api/profile/${id}`).then((res) => {
      if (res.data.status === 200) {
        setUserInput(res.data.user);
      } else if (res.data.status === 404) {
        swal({
          title: "Error",
          text: "User not found",
          icon: "error",
          button: "OK",
        });
        history.push("/admin/profile");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);
  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const updateUser = (e) => {
    e.preventDefault();

    const id = props.match.params.id;
    const data = userInput;
    axios.put(`api/profile/edit/${id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal({
          title: "Success",
          text: "User updated",
          icon: "success",
          button: "OK",
        });
        setError([]);
      } else if (res.data.status === 442) {
        swal({
            title: "Error",
            text: "User not found",
            icon: "error",
            button: "OK",
            });
        setError([res.data.error]);
      }else if(res.data.status === 4){
        swal("Error", res.data.message, "error");
        history.push("/admin/profile");
      }
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Chỉnh sửa thông tin người dùng
            <Link
              to="/admin/profile"
              className="btn btn-primary btn-sm float-end text-decoration-none"
            >
              Quay lại
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateUser}>
            <div className="form-group mb-2">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                name="fullname"
                onChange={handleInput}
                value={userInput.fullname}
                className="form-control"
              />
              <small className="text-danger">{error.fullname}</small>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleInput}
                value={userInput.username}
                className="form-control"
              />
              <small className="text-danger">{error.username}</small>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                value={userInput.email}
                className="form-control"
              />
              <small className="text-danger">{error.email}</small>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleInput}
                value={userInput.phone}
                className="form-control"
              />
              <small className="text-danger">{error.phone}</small>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                value={userInput.password}
                className="form-control"
              />
              <small className="text-danger">{error.password}</small>
            </div>

            <button type="submit" className="btn btn-primary form-control">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
