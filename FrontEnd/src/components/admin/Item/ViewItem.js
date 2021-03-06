import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";

function ViewItem() {

    const [loading, setLoading] = useState(true);
    const [viewItem, setItem] = useState([]);

    useEffect(() => {

        document.title = "View Items";

        axios.get(`/api/view-item-quiz`).then(res => {
            if (res.data.status === 200) {
                setItem(res.data.items);
                console.log(res.data.items);
                setLoading(false);
            }
        })

    }, []);
    
    const deleteItemQuiz = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Đang xóa";

        axios.delete(`/api/delete-item-quiz/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Xóa";
            }
        });
    }

    var display_ItemData = "";

    if (loading) {
        return <h4>View Items Loading...</h4>
    } else {
        var ItemStatus = '';
        display_ItemData = viewItem.map((item, index) => {
            if (item.status === 0) {
                ItemStatus = 'Show';
            } else if (item.status === 1) {
                ItemStatus = 'Hidden';
            }

            return (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.description}</td>
                    <td>
                        {item.time}
                    </td>
                    <td>
                        <img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} />
                    </td>
                    <td>
                        <Link to={`edit-item-quiz/${item.id}`} className="btn btn-success btn-sm text-decoration-none">Sửa</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteItemQuiz(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
                    </td>
                    <td>
                        {ItemStatus}
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>View Item
                        <Link to="/admin/add-item-quiz" className="btn btn-primary btn-sm float-end text-decoration-none">Add Item</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Item Name</th>
                                    <th>Slug</th>
                                    <th>Description</th>
                                    <th>Time</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_ItemData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem;