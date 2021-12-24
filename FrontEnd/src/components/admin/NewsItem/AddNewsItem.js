import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

function AddNewsItem() {

    const [newsList, setNewsList] = useState([]);
    const [newsItemInput, setNewsItem] = useState({
        news_id: '',
        name: '',
        slug: '',
        description: '',
        time: '',
        image: '',
        status: '',
    });

    const [pricture, setPricture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setNewsItem({ ...newsItemInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPricture({ image: e.target.files[0] });
    }

    useEffect(() => {
        axios.get(`/api/all-news`).then(res => {
            if (res.data.status === 200) {
                setNewsList(res.data.news);
            }
        });
    }, []);

    const submitNewsItem = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', pricture.image);
        formData.append('news_id', newsItemInput.news_id);
        formData.append('name', newsItemInput.name);
        formData.append('slug', newsItemInput.slug);
        formData.append('description', newsItemInput.description);
        formData.append('time', newsItemInput.time);
        formData.append('image', newsItemInput.image);
        formData.append('status', newsItemInput.status);

        axios.post(`/api/store-newsitem`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                setNewsItem({...newsItemInput,
                    news_id: '',
                    name: '',
                    slug: '',
                    description: '',
                    time: '',
                    image: '',
                    status: '',
                });
                setError([]);
            }
            else if(res.data.status === 422 ){
                swal("All Fields are mandetory","", "error");
                setError(res.data.errors);
            }
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Add News Item
                        <Link
                            to="/admin/view-news-item"
                            className="btn btn-primary btn-sm float-end"
                        >
                            View News Item
                        </Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitNewsItem} encType="multipart/form-data">
                        {/* <form onSubmit={submitItem} encType="multipart/form-data"> */}
                        <div className="form-group mb-2">
                            <label className="form-label">Select category</label>
                            <select name="news_id" onChange={handleInput} value={newsItemInput.news_id} className="form-select form-control">
                                <option>Select option</option>
                                {
                                    newsList.map((item) => {
                                        return (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <small className="text-danger"></small>
                            <small className="text-danger">{errorlist.news_id}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Tiêu đề</label>
                            <input type="text" name="name" onChange={handleInput} value={newsItemInput.name} className="form-control" />
                            <small className="text-danger"></small>
                            <small className="text-danger">{errorlist.name}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={newsItemInput.slug} className="form-control" />
                            <small className="text-danger"></small>
                            <small className="text-danger">{errorlist.slug}</small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Mô tả</label>
                            <input type="text" name="description" onChange={handleInput} value={newsItemInput.description} className="form-control" />
                            <small className="text-danger">{errorlist.description}</small>
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Thời gian</label>
                            <input type="text" name="time" onChange={handleInput} value={newsItemInput.time} className="form-control" />
                            <small className="text-danger">{errorlist.time}</small>
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Hình ảnh</label>
                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                            <small className="text-danger">{errorlist.image}</small>
                            <small className="text-danger"></small>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">
                                Trạng thái&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                            <input type="checkbox" name="status" onChange={handleInput} value={newsItemInput.status} className="form-check-input" />
                            {/* <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} className="form-check-input"/> */}
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">
                            Thêm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNewsItem;