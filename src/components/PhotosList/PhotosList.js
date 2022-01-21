import './PhotosList.css';
import {useEffect, useState} from "react";

function PhotosList () {
    const [photosList, SetPhotosList] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch('https://boiling-refuge-66454.herokuapp.com/images');
            if (response.ok) {
                const photosListData = await response.json();
                SetPhotosList(photosListData);
            }

        } catch (error) {
            console.error('Error reading data', error);
        }

    }, []);

    if (photosList.length === 0) return <p className="main-container">Photos are loading...</p>
    return (
        <main className="main-container">
            {photosList.map(photo => {
             return <img
                        className="main-container-element"
                        src={photo.url}
                        key={photo.id}
                        alt="photo"/>
            })}
        </main>

    )
}

export default PhotosList;