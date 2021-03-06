import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function AddCategoryQuiz() {

    const [categoryQuiz, setCategoryQuiz] = useState({
        name: '',
        slug: '',
        description: '',
        status: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setCategoryQuiz({ ...categoryQuiz, [e.target.name]: e.target.value })
    }

    const addCategoryQuiz = (e) => {
        e.preventDefault();

        const data = {
            name: categoryQuiz.name,
            slug: categoryQuiz.slug,
            description: categoryQuiz.description,
            status: categoryQuiz.status,
        }

        axios.post(`/api/store-category-quiz`, data).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setCategoryQuiz({
                    ...categoryQuiz,
                    name: '',
                    slug: '',
                    description: '',
                    status: '',
                    error_list: [],
                });
                // document.getElementById('CATEGORY_QUIZ_FORM').reset();
            }
            else if (res.data.status === 400) {
                setCategoryQuiz({ ...categoryQuiz, error_list: res.data.errors })
            }
        })
    }

    var display_errors = [];
    if (categoryQuiz.error_list) {
        display_errors = [
            categoryQuiz.error_list.name,
            categoryQuiz.error_list.slug,
            categoryQuiz.error_list.description,
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
                    <h4>Th??m danh m???c
                        <Link to="/admin/view-category-quiz" className="btn btn-primary btn-sm float-end text-decoration-none">Xem danh m???c</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={addCategoryQuiz} id="CATEGORY_QUIZ_FORM">
                        <div className="form-group mb-2">
                            <label className="form-label">T??n danh m???c</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryQuiz.name} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={categoryQuiz.slug} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">M?? t???</label>
                            <input type="text" name="description" onChange={handleInput} value={categoryQuiz.description} className="form-control" />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Tr???ng th??i &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={categoryQuiz.status} className="form-check-input" />
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Th??m</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategoryQuiz;