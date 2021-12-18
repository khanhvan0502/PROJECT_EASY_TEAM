import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";


function EditNews(props) {

    const history = useHistory();
    const [newsInput, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);    

    useEffect(() => {
        const news_id = props.match.params.id;

        axios.get(`/api/edit-news/${news_id}`).then(res => {
            if (res.data.status === 200) {
                setNews(res.data.news);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('admin/view-news');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setNews({ ...newsInput, [e.target.name]: e.target.value });
    };

    const updateNews = (e) => {
        e.preventDefault();

        const news_id = props.match.params.id;
        const data = newsInput;
        axios.put(`/api/update-news/${news_id}`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404){
                swal("Error", res.data.message,"error");
                history.push('admin/view-news');
            }
        });
    }

    if (loading) {
        return <h4>Đang tải trang sửa danh mục...</h4>;
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4> Edit News
                        <Link to="/admin/view-news" className="btn btn-primary btn-sm float-end text-decoration-none">Xem danh mục tin tức</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateNews}>
                        <div className="form-group mb-2">
                            <label className="form-label">Tên danh mục tin tức</label>
                            <input type="text" name="name" onChange={handleInput} value={newsInput.name} className="form-control" />
                            <small className="text-danger">{error.name}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={newsInput.slug} className="form-control" />
                            <small className="text-danger">{error.slug}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Mô tả</label>
                            <input type="text" name="description" onChange={handleInput} value={newsInput.description} className="form-control" />
                            <small className="text-danger">{error.description}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Trạng thái &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={newsInput.status} className="form-check-input" />
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNews;