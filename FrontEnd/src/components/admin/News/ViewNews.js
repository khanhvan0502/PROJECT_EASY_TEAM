import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';

function ViewNews() {

    const [loading, setLoading] = useState(true);
    const [newslist, setNewslist] = useState([]);

    useEffect(() => {
       axios.get(`/api/view-news`).then(res=>{
           console.log(res.data.news);
            if(res.status === 200){
                setNewslist(res.data.news)
            }
            setLoading(false);
       });
    },[]);

    const deleteNews = (e, id)=>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-news/${id}`).then(res=>{
            if(res.data.status === 200){
                swal('Success', res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal('Success', res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });
    }
    
    var viewnews_HTMLTABLE = "";

    if(loading){
        return <h4>Loading News...</h4>
    } else {
        viewnews_HTMLTABLE = newslist.map((item)=>{
            return (
                <tr key ={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-news/${item.id}`} className="btn btn-success btn-sm text-decoration-none">Sửa</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteNews(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Danh sách mục
                        <Link to="/admin/add-news" className="btn btn-primary btn-sm float-end text-decoration-none">Thêm danh mục</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Slug</th>
                                <th>Mô tả</th>
                                <th>Trạng thái</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewnews_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewNews;