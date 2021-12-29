import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

function EditNewsItem(props) {

    const history = useHistory();

    const [newsList, setNewsList] = useState([]);
    const [newsItemInput, setNewsItem] = useState({
        news_id: '',
        name: '',
        slug: '',
        description: '',
        time: '',
        image: '',
    });

    const [pricture, setPricture] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setNewsItem({ ...newsItemInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPricture({ image: e.target.files[0] });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked })
    }

    useEffect(() => {
        axios.get(`/api/all-news`).then(res => {
            if (res.data.status === 200) {
                setNewsList(res.data.news);
            }
        });

        const newsitem_id = props.match.params.id;

        axios.get(`/api/edit-news-item/${newsitem_id}`).then(res => {
            if (res.data.status === 200) {
                setNewsItem(res.data.newsitem);
                setCheckboxes(res.data.newsitem);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('admin/view-news-item');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const updateNewsItem = (e) => {
        e.preventDefault();

        const newsitem_id = props.match.params.id;
        const formData = new FormData();
        formData.append('image', pricture.image);
        formData.append('news_id', newsItemInput.news_id);
        formData.append('name', newsItemInput.name);
        formData.append('slug', newsItemInput.slug);
        formData.append('description', newsItemInput.description);
        formData.append('time', newsItemInput.time);
        formData.append('image', newsItemInput.image);
        formData.append('status', allcheckbox.status ? '1' : '0');

        axios.post(`/api/update-news-item/${newsitem_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandetory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-news-item');
            }
        });
    }

    if (loading) {
        return <h4>Edit NewsItem Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Edit NewsItem
                        <Link
                            to="/admin/view-news-item"
                            className="btn btn-primary btn-sm float-end">
                            View NewsItem
                        </Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateNewsItem} encType="multipart/form-data">
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
                            <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} className="form-check-input" />
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNewsItem;