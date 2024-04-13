import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import Modal from './Modal';
import { storage } from "../config/firebase";
import { ref, deleteObject } from "firebase/storage";

function PostCard({ id, title, author, createdAt, body, imageName, imageUrl, edited, likes, dislikes }) {
    const queryClient = useQueryClient();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    const updatePost = async () => {
        if (!newBody && !newTitle) return;
        const editedPost = {
            title: newTitle,
            body: newBody,
            edited: true
        }
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedPost),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setShowUpdateModal(false);
        } else {
            console.log("Post could not be updated!");
        }
    }

    const deletePost = async () => {
        await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
        });

        if (imageName !== null) {
            const imageRef = ref(storage, `images/${imageName}`);
            try {
                await deleteObject(imageRef);
                console.log("Image removed from storage");
            } catch (error) {
                console.log(error);   
            }
        }
        setShowDeleteModal(false);
    };

    const { mutateAsync: deletePostMutation } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const { mutateAsync: updatePostMutation } = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    return (
        <>
            {
                showUpdateModal &&
                <Modal
                    onClose={() => setShowUpdateModal(false)}
                    header="Edit post"
                    body={
                        <div>
                            <input onChange={(e) => setNewTitle(e.target.value)} defaultValue={title} type="text" placeholder="Post title..." />
                            <textarea defaultValue={body} onChange={(e) => setNewBody(e.target.value)} cols="30" rows="10" placeholder="Enter post body..."></textarea>
                        </div>
                    }
                    footer={<button onClick={updatePostMutation}>Save</button>}
                />
            }
            {
                showDeleteModal &&
                <Modal
                    onClose={() => setShowDeleteModal(false)}
                    header="Delete post"
                    body={<b>Do you really want to delete this post?</b>}
                    footer={
                        <div>
                            <button className='modal-delete-btn' onClick={deletePostMutation}>Yes</button>
                            <button onClick={() => setShowDeleteModal(false)}>No</button>
                        </div>
                    }
                />
            }
            <div className="post-container">
                <h3>{title}</h3>
                <div className="post-info">
                    posted by <b>{author}</b> &nbsp;
                    {formatDistanceToNow(new Date(createdAt), { addSuffix: true })} &nbsp;
                    {edited && "(edited)"}
                </div>
                <div className='post-actions'>
                    <span onClick={() => setShowUpdateModal(true)} className="material-symbols-outlined edit">
                        edit
                    </span>
                    <span onClick={() => setShowDeleteModal(true)} className='delete-btn'>&times;</span>
                </div>
                <p>{body}</p>
                {
                    imageUrl && <img src={imageUrl} />
                }

                <div className="action-container">
                    <span className="material-symbols-outlined">
                        thumb_up
                    </span>
                    <span className="count">{likes}</span>
                    <span className="material-symbols-outlined">
                        thumb_down
                    </span>
                    <span className="count">{dislikes}</span>
                </div>
            </div>
        </>
    );
}

export default PostCard;