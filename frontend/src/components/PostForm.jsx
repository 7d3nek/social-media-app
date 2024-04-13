import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function PostForm() {

    const [image, setImage] = useState(null);
    const [inputFileKey, setInputFileKey] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const uploadImage = async () => {
        if (image) {
            const imageName = image.name + v4();
            const imageRef = ref(storage, `images/${imageName}`);
            try {
                const snapshot = await uploadBytes(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                return { url, imageName }; // This will return the URL to the caller
            } catch (e) {
                console.log("could not retrieve a url");
                console.log(e);
            }
        }
        return null; // If there's no image, return null
    }

    const createPost = async (e) => {
        e.preventDefault();
        if (title === "" || body === "") return;
        setIsLoading(true);
        let post = {
            author: "John Doe",
            title,
            body
        }

        if (image !== null) {
            const { url, imageName } = await uploadImage();
            post = { ...post, imageName, imageUrl: url };
        }


        const response = await fetch("http://localhost:3000/posts/", {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            console.log("Unable to post...");
            console.log(json.error);
        }

        if (response.ok) {
            setTitle("");
            setBody("");
            setImage(null);
            setInputFileKey(v4());
            console.log("New post added...");
        }
        setIsLoading(false);
    }

    const { mutateAsync: createPostMutation } = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    return (
        <div className="post-form-container">
            <form onSubmit={createPostMutation}>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Post title..." />
                <textarea onChange={(e) => setBody(e.target.value)} value={body} cols="30" rows="10" placeholder="Enter post body..."></textarea>
                <input key={inputFileKey} onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" />
                {
                    isLoading ? <button className="posting-btn">Posting...</button> : <button type="submit">Post</button>
                }
            </form>
        </div>
    );
}

export default PostForm;
