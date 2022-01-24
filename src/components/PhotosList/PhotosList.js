import './PhotosList.css';
import {useEffect, useState} from "react";
import  PhotoDetailed from './../PhotoDetailed/PhotoDetailed';

function PhotosList () {
    const [photosList, setPhotosList] = useState([]);
    const [ShowDetailedId, setShowDetailed] = useState(null);

    function selectPhotoHandler(photoId) {
        setShowDetailed(photoId);
    }

    useEffect(async () => {
        try {
            const response = await fetch('https://boiling-refuge-66454.herokuapp.com/images');
            if (response.ok) {
                const photosListData = await response.json();
                setPhotosList(photosListData);
            }

        } catch (error) {
            console.error('Error reading data', error);
        }

    }, []);

    if (photosList.length === 0) return <p className="main-container">Photos are loading...</p>
    return (
        <>
            <main className="main-container">
                {photosList.map(({id, url}) => {
                    return <img
                        className="main-container-element"
                        src={url}
                        key={id}
                        alt="photo"
                        onClick={() => selectPhotoHandler(id)}
                    />
                })}
            </main>
            {ShowDetailedId ? <PhotoDetailed photoId={ShowDetailedId} closeModal={setShowDetailed}/> : null}
        </>


    )
}

export default PhotosList;