import ScrollButton from "../../../layouts/frontend/ScrollButton";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function ViewNewsItem(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [newsItem, setNewsItem] = useState([]);
    const [news, setNews] = useState([]);

    const newsItemCount = newsItem.length;

    useEffect(() => {

        let isMounted = true;
        const newsitem_slug = props.match.params.slug;

        axios.get(`/api/fetchnewsitems/${newsitem_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setNewsItem(res.data.newsItem_data.newsItem);
                    setNews(res.data.newsItem_data.news);
                    setLoading(false);
                }
                else if (res.data.status === 200) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    history.push('/news');
                    swal("Warning", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false;
        };
    }, [props.match.params.slug, history]);

    if (loading) {
        return <h4>Loading NewsItem...</h4>
    }
    else {
        var showNewsItemList = '';
        if (newsItemCount) {
            showNewsItemList = newsItem.map((item, idx) => {
                return (
                    <div className="col-md-4 mb-3" key={idx}>
                        <div className="card">
                            <Link className="text-decoration-none" to={`${item.news.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className="border" style={{ width: '100%', height: '200px' }} alt={item.name} />
                                <div className="card-body">
                                    <h5 className="text-center" style={{ width: '100%', whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{item.name}</h5>
                                    <hr />
                                    <p className="text-justify" style={{ width: '100%', whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: '5', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{item.description}</p>
                                    {/* <textarea name="message" rows={5} cols={40} defaultValue={item.description} /> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            });
        }
        else {
            showNewsItemList =
                <div className="col-md-12">
                    <h4>No NewsItem Available for {news.name} </h4>
                </div>
        }
    }


    return (
        <div>
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">Danh Sách Tin Tức</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 bg-warning mb-3">
                <div className="container">
                    <h6 className="text-uppercase"><Link className="text-decoration-none" style={{ color: 'black' }} to="/news">Danh mục</Link> / {news.name}</h6>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {showNewsItemList}
                </div>
            </div>
            <ScrollButton />
        </div>
    );
}

export default ViewNewsItem;