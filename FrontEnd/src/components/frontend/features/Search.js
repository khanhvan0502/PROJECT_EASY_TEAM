import ScrollButton from "../../../layouts/frontend/ScrollButton";
import React, { useState } from 'react';
import php from './php.png';
import { Link } from 'react-router-dom';

function Search() {
    const [data, setData] = useState([]);

    async function search(key) {
        if (key.length > 1) {
            let result = await fetch("http://localhost:8000/api/search/" + key);
            result = await result.json();
            console.log(result);
            setData(result);
        }
    }

    const dataNew = Object.values(data);

    return (
        <div>
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">Tìm kiếm</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className='container'>
                <input onChange={(e) => search(e.target.value)} className="form-control search-input" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />                <br />
                <div className="row">
                    {
                        dataNew.length > 0 ?
                            dataNew.map((item) => {
                                return (
                                    <Link className="col-md-3 mb-3 text-decoration-none" to="/listquiz" key={item.id}>
                                        <div className="card">
                                            <img src={`http://localhost:8000/${item.image}`} style={{ width: '100%', height: '200px' }} alt={item.name} />
                                            <hr />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{item.name}</h5>
                                                <p className="card-text">{item.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            : <h2>Search Item</h2>
                    }
                </div>
            </div>
        </div>
    )
}
export default Search;