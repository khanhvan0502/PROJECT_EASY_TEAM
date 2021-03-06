import ScrollButton from "../../../layouts/frontend/ScrollButton";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import newImage from './news.jpg';
import Footer from "../../../layouts/frontend/Footer";

function ViewNews() {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getNews`).then(res => {
            if (isMountered) {
                if (res.data.status === 200) {
                    setNews(res.data.news);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMountered = false;
        }
    });

    if (loading) {
        return <h4>Loading News...</h4>
    }
    else {
        var showNewsList = '';
        showNewsList = news.map((item) => {
            return (
                <div className="col-md-4" key={item.id}>
                    <div className="card">
                        <Link className="text-decoration-none" to={`news/${item.slug}`}>
                            <img src={newImage} style={{ width: '100%', height: '250px' }} alt={item.name} />
                            <hr />
                            <div className="card-body">
                                <h5 className="card-title text-center text-dark">{item.name}</h5>
                                <p className="card-text text-dark" style={{ width: '100%', whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{item.description}</p>
                            </div>
                        </Link>
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
                            <h1 className="text-center">Danh M???c Tin T???c</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 bg-warning mb-3">
                <div className="container">
                    <h6 className="text-uppercase">Danh m???c</h6>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-5">
                    {showNewsList}
                </div>
            </div>
            <ScrollButton />
            <Footer />
        </div>
    );
}

export default ViewNews;