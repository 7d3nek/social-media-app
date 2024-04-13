import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import SearchBar from '../components/SearchBar';

function Home() {
    const url = "http://localhost:3000/posts/";

    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: () => fetch(url).then((res) => res.json())
    });
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>Something went wrong...</h1>;
    }

    return (
        <div className="home">
            <PostForm />
            <h2>Recent posts</h2>
            <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} setIsSearching={setIsSearching}/>
            {
                filteredPosts?.length > 0 ? filteredPosts?.map((post) => (
                    <PostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        author={post.author}
                        createdAt={post.createdAt}
                        body={post.body}
                        imageName={post.imageName}
                        imageUrl={post.imageUrl}
                        edited={post.edited}
                        likes={post.likes}
                        dislikes={post.dislikes} />
                )) :
                isSearching ? <p><b>No posts found :(</b></p> :
                posts?.length > 0 ? posts?.map((post) => (
                    <PostCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        author={post.author}
                        createdAt={post.createdAt}
                        body={post.body}
                        imageName={post.imageName}
                        imageUrl={post.imageUrl}
                        edited={post.edited}
                        likes={post.likes}
                        dislikes={post.dislikes} />
                ))
                :
                <p><b>No posts found :(</b></p>

            }
        </div>
    );
}

export default Home;