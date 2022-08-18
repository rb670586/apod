import Link from 'next/link';
import { useUser } from '../lib/hooks';
import { useState, useEffect } from 'react';
import Router from "next/router";

export default function Pics() {
    const [user, { mutate }] = useUser();
    const [photoDate, setPhotoDate] = useState(new Date().toLocaleString("en-CA", {timeZone: "America/New_York"}).slice(0, 10));
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, isLoading] = useState(false);
    const [photoInfo, setPhotoInfo] = useState([])
    const [query, setQuery] = useState(photoDate);


    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        Router.replace("/")
        // set the user state to null
        mutate(null);
        isLoading(false);
    };

    // If user is not logged in, redirect to home
    useEffect(() => {
        if (!user) Router.replace("/");
    }, [user]);

    // Query NASA APOD API for today's pic
    useEffect(() => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=vYaTUf9zPDwSbeaTEYZAfA4Xe8d9AIoVpalhpHjv&date=${photoDate}`)
        .then((response) => response.json())
        .then((data) => setPhotoInfo(data));
      }, []);

    const addToFavorites = async (userID, photoID) => {
        const body = {
            userID: userID,
            photoID: photoID
        };
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            console.log('Record Added')
            // const userObj = await res.json();
            // // writing our user object to the state
            // mutate(userObj);
        } else {
            isLoading(false);
            setErrorMsg(await res.text());
        }
    };

    const handleSearch = () => {
        console.log(query);
        fetch(`https://api.nasa.gov/planetary/apod?api_key=vYaTUf9zPDwSbeaTEYZAfA4Xe8d9AIoVpalhpHjv&date=${query}`)
        .then((response) => response.json())
        .then((data) => setPhotoInfo(data));
      };

    return (
        <>
            <div className="search-container" style={{ marginBottom: '.60em' }}>
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="search" style={{ display: 'flex' }}>
                            <input type="date" 
                                max = {new Date().toLocaleString("en-CA", {timeZone: "America/New_York"}).slice(0, 10)} 
                                className="form-control form-input" value={query} onChange={(e) => {setQuery(e.target.value)}} 
                            />
                            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="row g-0" >
                    <div className="col-md-5">
                        <img src={photoInfo['hdurl']} className="img-fluid" alt={photoInfo['title']} title={photoInfo['title']}/>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body h-100 text-center">
                            <div className='row h-100' style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                <div className='col-sm-12'>
                                    <h2 style={{ marginTop: '0' }}><span style={{ fontWeight: 'bolder', color:'#02C39A', textShadow: '1.25px 1.25px black' }}>{photoInfo['date']}</span> Photo of the Day</h2>
                                    <h3>{photoInfo['title']}</h3>
                                </div>
                                <div className='col-sm-12'>
                                        <div className="card-text">
                                            {photoInfo['explanation']}
                                        </div>
                                </div>
                                <div className='col-sm-12' style={{ alignSelf: 'end' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" className="btn btn-primary" onClick={() => addToFavorites(user['_id'], photoInfo['url'])}>Add to Favorites</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
