import ScrollButton from "../../../layouts/frontend/ScrollButton";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function ViewNewsItemDetail(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [newsItem, setNewsItem] = useState([]);

    const newsItemCount = newsItem.length;

    useEffect(() => {

        let isMounted = true;
        const news_slug = props.match.params.news;
        const newsitem_slug = props.match.params.newsitem;

        axios.get(`/api/view-newsitems-detail/${news_slug}/${newsitem_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setNewsItem(res.data.newsItem);
                    setLoading(false);
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
    }, [props.match.params.news, props.match.params.newsitem, history]);


    if (loading) {
        return <h4>Loading NewsItemDetail...</h4>
    }

    return (
        <div>
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">Chi tiết Tin Tức</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 bg-warning mb-3">
                <div className="container">
                    <h6 className="text-uppercase"><Link className="text-decoration-none" style={{ color: 'black' }} to="/news">Danh mục</Link>/<Link className="text-decoration-none" style={{ color: 'black' }} to={`/news/${newsItem.slug}`}>{newsItem.news.name}</Link>/{newsItem.name}</h6>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <Link className="text-decoration-none">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={`http://localhost:8000/${newsItem.image}`} className="card-img" alt={newsItem.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-dark">{newsItem.name}</h5>
                                            <p className="card-text text-dark">{newsItem.description}</p>
                                            {/* <p className="card-text text-dark"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* {showNewsItemList} */}
            <ScrollButton />
        </div>
    );
}
export default ViewNewsItemDetail;