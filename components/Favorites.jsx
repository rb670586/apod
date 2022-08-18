import { useUser } from '../lib/hooks';
import { useState, useEffect } from 'react';
import Router from "next/router";
import ImageGallery from 'react-image-gallery';

export default function Favorites() {
    const [user, { mutate }] = useUser();
    const [photoDate, setPhotoDate] = useState(new Date().toLocaleString("en-CA", {timeZone: "America/New_York"}).slice(0, 10));
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, isLoading] = useState(false);
    const [favorites, setFavorites] = useState(["https://via.placeholder.com/600"])
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


    const viewFavorites = async () => {
        fetch('/api/view').then(res => res.json())
            .then(data => {
                setFavorites(data[0]['favorites'])
            });
    };

    
    useEffect(() => {
        viewFavorites()
      }, [])

    var galleryImages = []
    for (let i = 0; i < favorites.length; i++) {
        const image = favorites[i];
        galleryImages.push({original: image});
    }

    return (
        <>
            {!favorites ? (
                <>
                    <ImageGallery items={[{original: 'https://via.placeholder.com/600'}]} />
                </>
            ) : (<ImageGallery items={galleryImages}/>)}
        </>
    )
}
