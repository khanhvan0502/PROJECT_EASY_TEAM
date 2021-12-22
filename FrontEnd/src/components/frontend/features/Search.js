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

<<<<<<< HEAD
    const datanew = Object.values(data);

    return (
        // <div>
=======
    const dataNew = Object.values(data);

    return (
        // <div>
        //     <header className="ex-header">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-xl-10 offset-xl-1">
        //                     <h1 className="text-center">SEARCH...</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </header>

>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
        //     <form action="/search" className="d-none d-md-inline-block form-inline ms-auto my-2 my-md-0">
        //         <div className="input-group">
        //             <input name="query" className="form-control search-input" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
        //             <button className="btn search-btn" id="btnNavbarSearch" type="submit"><i className="fas fa-search icon-btn" /></button>
        //         </div>
        //     </form>
        // </div>
        <div>
<<<<<<< HEAD
            <form className="d-none d-md-inline-block form-inline ms-auto my-2 my-md-0">
                <div className="input-group">
                    <input onChange={(e) => search(e.target.value)} className="form-control search-input" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    {
                        // data.length>0?{
                        datanew.map((item) =>
=======
            <header className="ex-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center">SEARCH...</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className='container'>
                {/* <form className="d-none d-md-inline-block form-inline ms-auto my-2 my-md-0"> */}
                    <div className="input-group">
                        <input onChange={(e) => search(e.target.value)} className="form-control search-input" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn search-btn" id="btnNavbarSearch" type="button"><i className="fas fa-search icon-btn"/></button>
                    </div>
                {/* </form> */}
                <div>
                    {
                        // data.length>0?{
                        dataNew.map((item) =>
>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
                            <div className="col-md-3" key={item.id}>
                                <div className="card">
                                    <img src={php} style={{ width: '100%', height: '280px' }} alt={item.name} />
                                    <hr />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                        // }:<h2> Search</h2>"null";
                    }
<<<<<<< HEAD
                    {/* <button className="btn search-btn" id="btnNavbarSearch" type="button"><i className="fas fa-search icon-btn" /></button> */}
                </div>
            </form>
        </div>
=======
                </div>
            </div>
        </div >
>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
    );
}

export default Search;