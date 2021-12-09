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

// class AddProfile extends React.Component {
//   render() {
//     return (
//       <div>
//         <Button
//           className="float-right mb-4"
//           color="success"
//           onClick={this.props.toggleNewUserModal}
//         >
//           Thêm người dùng
//         </Button>
//         <Modal
//           isOpen={this.props.newUserModal}
//           toggle={this.props.toggleNewUserModal}
//         >
//           <ModalHeader toggle={this.props.toggleNewUserModal}>
//             Thêm người dùng mới
//           </ModalHeader>
//           <ModalBody>
//             <FormGroup>
//               <Label for="fullname">Họ và tên</Label>
//               <Input
//                 id="fullname"
//                 name="fullname"
//                 value={this.props.newUserData.fullname}
//                 onChange={this.props.onChangeAddUserHandler}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="username">Username</Label>
//               <Input
//                 id="username"
//                 name="username"
//                 value={this.props.newUserData.username}
//                 onChange={this.props.onChangeAddUserHandler}
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 value={this.props.newUserData.email}
//                 onChange={this.props.onChangeAddUserHandler}
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={this.props.newUserData.password}
//                 onChange={this.props.onChangeAddUserHandler}
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="phone">Điện thoại</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 value={this.props.newUserData.phone}
//                 onChange={this.props.onChangeAddUserHandler}
//               />
//             </FormGroup>

//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={() => this.props.addUser()}>
//               Add
//             </Button>{" "}
//             <Button color="secondary" onClick={this.props.toggleNewUserModal}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }
// export default AddProfile;

//----------------------------------------------------------------------------------
import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
function AddProfile() {
  const [Profile, setProfile] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role_as: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setProfile({
      ...Profile,
      [e.target.name]: e.target.value,
    });
  };
  const addProfile = (e) => {
    e.preventDefault();
    const data = {
        fullname: Profile.fullname,
        username: Profile.username,
        email: Profile.email,
        password: Profile.password,
        phone: Profile.phone,
        role_as: "1",
    };
    axios
      .post(`api/profile/add`,data)
      .then((res) => {
        if (res.data.error) {
          setProfile({
            ...Profile,
            error_list: res.data.error,
          });
          swal("Thêm người dùng thất bại", "", "error");
        } else {
          swal("Thêm người dùng thành công", "", "success");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var displayError = [];
    if (Profile.error_list) {
      displayError = [
          Profile.error_list.fullname,
            Profile.error_list.username,
            Profile.error_list.email,
            Profile.error_list.password,
            Profile.error_list.phone,
            Profile.error_list.role_as,
      ]
    }
    return (
        <div className="container-fluid px-4">

            {
                displayError.map((item, key) => {
                    return (
                        <p className="mb-1" key={key}>{item}</p>
                    )
                })
            }
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm người dùng
                        <Link to="/admin/profile" className="btn btn-primary btn-sm float-end text-decoration-none">Xem danh sách</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={addProfile} id="PROFILE_FORM">
                        <div className="form-group mb-2">
                            <label className="form-label">Họ và tên</label>
                            <input type="text" name="fullname" onChange={handleInput} value={Profile.fullname} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Username</label>
                            <input type="text" name="username" onChange={handleInput} value={Profile.username} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" onChange={handleInput} value={Profile.email} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" onChange={handleInput} value={Profile.password} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Điện thoại</label>
                            <input type="text" name="phone" onChange={handleInput} value={Profile.phone} className="form-control" />
                        </div>
                        {/* <div className="form-group mb-2">
                            <label className="form-label">Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={Profile.role_as} className="form-check-input" />
                        </div> */}
                        <button type="submit" className="btn btn-primary px-4 mt-2">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddProfile;
