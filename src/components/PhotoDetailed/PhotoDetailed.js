import './PhotoDetailed.css';
import {useEffect, useState} from "react";

export default ({photoId, closeModal}) => {
    const [photoDetails, setPhotoDetails] = useState(null);
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');

    function changeHandler(e) {
        const value = e.target.value;
        switch (e.target.name) {
            case 'commentName':
                setCommentName(value);
                break
            case 'commentText':
                setCommentText(value);
                break
        }
    }

    async function postCommentHandler(e) {
        e.preventDefault();
        const url = `https://boiling-refuge-66454.herokuapp.com/images/${photoId}/comments`;
        const option = { method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"name":commentName,"comment":commentText})
        };
        try {
            const response = await fetch(url, option);
            if (response.status !== 204) window.alert('Error saving comments!');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(async () => {
        try {
            const response = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${photoId}`);
            if (response.ok) {
                const photoData = await response.json();
                setPhotoDetails(photoData)
            } else alert('Error receiving info about photo')
        } catch (error) {
            console.error('Error requesting data about photo',error)
        }
    },[])
    if (!photoDetails) return <div>Reading data about photo</div>
    return (
        <div className="detailed-container">
            <div className="detailed-modal-content">
                <img className="detailed-photo" src={photoDetails.url}/>
                <div className="detailed-comments">
                    {photoDetails.comments.map(comment => {
                        return (
                            <>
                            <span className="detailed-comments-date" >{(new Date(comment.date)).toDateString()}</span>
                            <span className="detailed-comments-text">{comment.text}</span>
                            </>
                        )
                    })}
                </div>
                <form className="detailed-new-comment-form">
                    <input type="text" placeholder="Your name"
                           value={commentName} onChange={changeHandler}
                           name="commentName"
                    />
                    <input type="text" placeholder="Comment"
                           value={commentText} onChange={changeHandler}
                           name='commentText'
                    />
                    <button onClick={postCommentHandler}>Save comment</button>
                </form>
                {/*<button onClick={() => {closeModal(null)}}></button>*/}
                <i onClick={() => {closeModal(null)}} className="detailed-close-button fa fa-times"></i>
            </div>

        </div>
    )
}