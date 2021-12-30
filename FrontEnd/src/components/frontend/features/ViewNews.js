import ScrollButton from "../../../layouts/frontend/ScrollButton";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import php from './php.png';

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
                <div className="col-md-3" key={item.id}>
                    <div className="card">
                        <Link className="text-decoration-none" to={`news/${item.slug}`}>
                            <img src={php} style={{ width: '100%', height: '280px' }} alt={item.name} />
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
                            <h1 className="text-center">Danh Mục Tin Tức</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 bg-warning mb-3">
                <div className="container">
                    <h6 className="text-uppercase">Danh mục</h6>
                </div>
            </div>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-5">
                    {showNewsList}
                </div>
            </div>
            <ScrollButton />
        </div>
    );
}

export default ViewNews;