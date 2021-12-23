import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import swal from "sweetalert";

function CuttingArray(choices) {
    if (!choices) return '';

    const choiceNew = choices[choices.length - 1].split(',');

    return choiceNew;
}

function GetIdChoice(idchoi) {
    if (idchoi.length > 0) {
        return idchoi[idchoi.length - 1];
    }
}

function GetIdItem(iditem) {
    if (iditem.length > 0) {
        return iditem[iditem.length - 1];
    }
}

function GetUserName(users) {
    if (users.length > 0) {
        return users[users.length - 1];
    }
}

function CompareArray(array1, array2) {
    let count = 0;
    if (array1.length === array2.length) {
        for (let i = 0; i < array1.length; ++i) {
            if (array1[i] === array2[i]) {
                count += 1;
            }
        }
    }

    return count;
}

function GetCorrectById(dataquiz, id_choice) {
    const correct = [];
    for (let i = 0; i < dataquiz.length; i++) {
        if (dataquiz[i].item_id === id_choice) {
            correct.push(dataquiz[i].ans_correct);
        }
    }
    return correct;
}

function GetQuestiontById(dataquiz, id_choice) {
    const question = [];
    for (let i = 0; i < dataquiz.length; i++) {
        if (dataquiz[i].item_id === id_choice) {
            question.push(dataquiz[i].question);
        }
    }
    return question;
}

function Result() {

    const history = useHistory();
    const [answer, setAnswer] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quizId, setQuizId] = useState([]);
    const [correct, setCorrect] = useState([]);
    const [choice, setChoice] = useState([]);
    const [idchoice, setIdChoice] = useState([]);
    const [userName, setUserName] = useState([]);
    const [question, setQuestion] = useState([]);
    // const id_item_answer = GetIdChoice(idchoice);

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("warning", "Login to view result", "error");
    }

    // console.log("du lieu cua nguoi dung lam : ", data[0].split(','));

    useEffect(() => {

        let isMountered = true;

        axios.get(`/api/get-answer`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    setAnswer(res.data.answer);
                    setLoading(false);
                } else if (res.data.status === 401) {
                    history('/');
                    swal("warning", res.data.message, "error");
                }
            }
        });

        axios.get(`/api/view-quiz`).then(res => {
            if (res.data.status === 200) {
                setQuiz(res.data.quizzes);
                setLoading(false);
            }
        });

        // axios.get(`/api/view-user`).then(res => {
        //     if (res.data.status === 200) {
        //         setUser(res.data.user);
        //     }
        // })

        return () => {
            isMountered = false;
        }
    }, [history]);

    useEffect(() => {
        setQuizId(quiz.map(item => item.item_id));

        setQuestion(GetQuestiontById(quiz, GetIdChoice(idchoice)));

        setIdChoice(answer.map((item) => item.item_id));

        setCorrect(GetCorrectById(quiz, GetIdChoice(idchoice)));

        setChoice(answer.map(item => item.quiz_choice));

        setUserName(answer.map(item => item.users.username));

    }, [quiz, answer]);

    if (loading) {
        return (
            <h4>Loading Result...</h4>
        )
    }

    const choiceNew = CuttingArray(choice);
    // console.log('du lieu nguoi dung lam :', CuttingArray(choice));
    // console.log('dap an dung :', correct);
    // console.log('id bo cau hoi :', quizId);
    const result = CompareArray(correct, choiceNew);

    const percent = (result, length) => {
        return (result / length) * 100;
    }

    // console.log(GetIdChoice(idchoice));
    // console.log(GetIdItem(quizId));
    console.log(question);
    console.log(choiceNew);

    // Phần Modal
    const showFormAnswer = () => {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">Kết quả</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mt-5">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-4 mx-auto">
                        <div className="card" style={{ width: '22rem' }}>
                            <div className="card-body">
                                <p className="text-center fw-normal">Chào <strong>{GetUserName(userName)}</strong> !</p>
                                <p className="text-center fw-normal">Số câu đúng: <strong>{result} / {correct.length}</strong></p>
                                <p className="text-center fw-normal">Phần trăm: <strong>{percent(result, correct.length)}%</strong></p>
                                <div className="row">
                                    <div className="col-1"></div>
                                    {/* {showButton()} */}
                                    <button type="button" className="col btn btn-primary rounded-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Đáp án
                                    </button>
                                    <div className="col-1"></div>
                                    <Link to="/listquiz" className="col btn btn-primary rounded-start">Làm lại</Link>
                                    <div className="col-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>


            {showFormAnswer()}

        </div>
    )
}

export default Result;