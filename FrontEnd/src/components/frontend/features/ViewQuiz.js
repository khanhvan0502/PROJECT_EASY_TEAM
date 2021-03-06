import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import ScrollButton from "../../../layouts/frontend/ScrollButton";
import './ViewQuiz.css';
import Footer from "../../../layouts/frontend/Footer";

function ViewQuiz(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState([]);
    const [item, setItem] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {

        let isMounted = true;

        const quiz_slug = props.match.params.slug;
        axios.get(`/api/fetch-quiz/${quiz_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setQuiz(res.data.quiz_data.quiz);
                    setItem(res.data.quiz_data.item);
                    setLoading(false);
                } else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                } else if (res.data.status === 404) {
                    history.push('/listquiz');
                    swal("Warning", res.data.status, "error");
                }
            }
        });
        return () => {
            isMounted = false;
        }
    }, [props.match.params.slug, history]);


    const changeHandle = (e) => {
        e.persist();
        setSelected({ ...selected, [e.target.name]: e.target.value });
    }

    // console.log(JSON.stringify(selected));
    // console.log(Object.values(selected).toString());


    const submitQuiz = (e) => {
        e.preventDefault();

        const data = {
            item_id: item.id,
            quiz_choice: Object.values(selected).toString(),
        }

        axios.post(`/api/answer`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/result');
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }

    if (loading) {
        return <h4>Loading Quiz...</h4>
    } else {
        var showQuizList = "";
        showQuizList = quiz.map((quiz, idx) => {
            return (
                <div className="form-group" key={idx}>
                    <div className="py-2 h5 form-group about"><b>{idx + 1}. {quiz.question}</b></div>
                    <div className="form-group" id="options">
                        <label className="options form-group">{quiz.ans_a}
                            <input className="form-check-input" type="radio" name={quiz.id} value={quiz.ans_a} onChange={changeHandle} />
                            <small className="checkmark" />
                        </label>
                        <label className="options form-group">{quiz.ans_b}
                            <input className="form-check-input" type="radio" name={quiz.id} value={quiz.ans_b} onChange={changeHandle} />
                            <small className="checkmark" />
                        </label>
                        <label className="options form-group">{quiz.ans_c}
                            <input className="form-check-input" type="radio" name={quiz.id} value={quiz.ans_c} onChange={changeHandle} />
                            <small className="checkmark" />
                        </label>
                        <label className="options form-group">{quiz.ans_d}
                            <input className="form-check-input" type="radio" name={quiz.id} value={quiz.ans_d} onChange={changeHandle} />
                            <small className="checkmark" />
                        </label>
                    </div>
                </div>
            )
        });
    }
    return (
        <div>
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">Danh S??ch C??u H???i</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6 className="text-uppercase text-dark"><Link className="text-decoration-none text-dark" to="/listquiz">danh m???c</Link> / <Link className="text-decoration-none text-dark" to={`/listquiz/${item.category.slug}`}>{item.category.name}</Link> / {item.name}</h6>
                </div>
            </div>
            <div className="container mt-sm-5 my-1 mb-5">
                <div className="row">
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-6" >
                        <div className="card mb-3">
                            <div className="card-header text-center text-uppercase py-2 h4">
                                B??i thi {item.name}
                            </div>
                            <div className="card-body">
                                <form>
                                    {showQuizList}
                                    <div className="d-grid gap-2">
                                        <button onClick={submitQuiz} className="form-control-submit-button" type="submit">N???p b??i</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
            </div>
            <ScrollButton />
            <Footer />
        </div>
    )
}

export default ViewQuiz;