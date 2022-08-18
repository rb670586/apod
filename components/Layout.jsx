import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GrEmoji } from 'react-icons/gr';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Router from 'next/router';
import { useUser } from "../lib/hooks";
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
        isLoading(false);
        router.push('/')
    };
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous"></script>
            </Head>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">NASA APOD</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" href="/"><a>Home</a></Link>
                                </li>
                                { user && 
                                <li className="nav-item">
                                    <Link className="nav-link" href="/pics"><a>Browse</a></Link>
                                </li> }
                                { user && 
                                <li className="nav-item">
                                    <Link className="nav-link" href="/favorites"><a>Favorites</a></Link>
                                </li> }
                            </ul>
                            { user && 
                                <li className="nav-item">
                                    <Link className="nav-link" href="/user/[userId]" as={`/user/${user._id}`}><a>Profile</a></Link>
                                </li> }
                            {user && <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                        </div>
                    </div>
                </nav>
            </header>
            <main className='d-flex justify-content-center align-items-center'>
                <div className="container mx-auto my-3 h-100">
                    <div className="row">
                        <div className="col-sm-12">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                    .container{
                        height:85vh;
                    }    
                    main{
                        min-height:85vh;
                    }
                `}</style>
        </>
    );
}
