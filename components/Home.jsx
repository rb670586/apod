import Link from 'next/link';
import { useUser } from '../lib/hooks';
import AfterLogin from '../components/AfterLogin';
import { useState } from 'react';

export default function Home() {
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        mutate(null);
        isLoading(false);
    };
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-5">
                        {!user ? (<>
                            <img
                                src='/Images/home.jpg'
                                className="img-fluid" alt="Welcome!" title="Welcome!"
                            />
                        </>) : (<img
                            src="/Images/home.jpg"
                            className="img-fluid" alt="Welcome! Logged in" title="Welcome! Logged in"
                        />)}
                    </div>
                    <div className="col-md-7">
                        <div className="card-body h-100 text-center">
                            <div className='row h-100' style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className='col-sm-12'>
                                    <h2 style={{ marginTop: '0' }}><span style={{ fontWeight: 'bolder', color: `${user ? '#5c9eff' : '#5c9eff'}`, textShadow: '2px 2px black' }}>Hi There </span>{!user ? 'Newbie' : user.name}</h2>
                                    <h4>Welcome to the <strong>NASA Astronomy Photo of the Day library</strong></h4>
                                </div>
                                <div className='col-sm-12'>
                                    {!user ? (<>
                                        <div className="card-text">
                                            This is a project created by Ryan Beebe for COSC631 Web Development and Programming Summer 2022 at Frostburg State University. 
                                            This application was developed using React, NextJS, MongoDB. Sign up or log in to view and add some
                                            fantastic astronomical photos to your library!
                                        </div>
                                    </>) : (<AfterLogin />)}
                                </div>
                                <div className='col-sm-12' style={{ alignSelf: 'end' }}>
                                    {!user ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/login">
                                                    <a className="btn btn-primary">Log in</a>
                                                </Link>
                                                <Link href="/signup">
                                                    <a className="btn btn-primary">Sign up</a>
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                                    <a className="btn btn-primary">Profile</a>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
