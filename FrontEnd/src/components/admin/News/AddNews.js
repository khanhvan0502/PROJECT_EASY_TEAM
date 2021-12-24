import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function AddNews() {

    const [newsInput, setNews] = useState({
        name: '',
        slug: '',
        description: '',
        status: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setNews({ ...newsInput, [e.target.name]: e.target.value })
    }

    const submitNews = (e) => {
        e.preventDefault();

        const data = {
            name: newsInput.name,
            slug: newsInput.slug,
            description: newsInput.description,
            status: newsInput.status,
        }

        axios.post(`/api/store-news`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                document.getElementById('NEWS-FORM').reset();
            } else
                if (res.data.status === 400) {
                    setNews({ ...newsInput, error_list: res.data.errors });
                }
        });

    }

    var display_errors = [];
    if (newsInput.error_list) {
        display_errors = [
            newsInput.error_list.name,
            newsInput.error_list.slug,
            newsInput.error_list.description,
        ]
    }

    return (
        <div className="container-fluid px-4">
            {
                display_errors.map((item, key) => {
                    return (
                        <p className="mb-1" key={key}>{item}</p>
                    )
                })
            }
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm danh mục
                        <Link to="/admin/view-news" className="btn btn-primary btn-sm float-end text-decoration-none">Xem danh mục tin tức</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitNews} id="NEWS-FORM">
                        <div className="form-group mb-2">
                            <label className="form-label">Tên danh mục tin tức</label>
                            <input type="text" name="name" onChange={handleInput} value={newsInput.name} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={newsInput.slug} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Mô tả</label>
                            <input type="text" name="description" onChange={handleInput} value={newsInput.description} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Trạng thái &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={newsInput.status} className="form-check-input" />
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNews;