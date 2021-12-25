import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function ViewNewsItem() {

    const [loading, setLoading] = useState(true);
    const [viewNewsItem, setNewsItem] = useState([]);

    useEffect(() => {
        document.title = "View NewsItem";

        axios.get(`/api/view-news-item`).then(res => {
            if (res.data.status === 200) {
                setNewsItem(res.data.newsitem);
                setLoading(false);
            };
        });
    }, []);

    var display_NewsItemData = "";

    if (loading) {
        return <h4>View News Item Loading...</h4>
    }
    else {
        var NewsItemStatus = '';
        display_NewsItemData = viewNewsItem.map((item) => {
            if (item.status === 0) {
                NewsItemStatus = 'Show';
            }
            else if (item.status === 1) {
                NewsItemStatus = 'Hidden';
            }

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.news.name}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.description}</td>
                    <td>{item.time}</td>
                    <td>
                        <img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} />
                    </td>
                    <td>
                        <Link to={`edit-news-item/${item.id}`} className="btn btn-success btn-sm text-decoration-none">Sửa</Link>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger btn-sm">Xóa</button>
                        {/* <button type="button" onClick={(e) => deleteItemQuiz(e, item.id)} className="btn btn-danger btn-sm">Xóa</button> */}
                    </td>
                    <td>{NewsItemStatus}</td>
                </tr>
            )
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>View NewsItem
                        <Link to="/admin/add-item-quiz" className="btn btn-primary btn-sm float-end text-decoration-none">Add NewsItem</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>News Name</th>
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
                                {display_NewsItemData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewNewsItem;