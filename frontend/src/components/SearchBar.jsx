import { useState } from "react"


function SearchBar({ posts, setFilteredPosts, setIsSearching }) {
    const [searchParam, setSearchParam] = useState("");

    function handleChange(e) {
        setSearchParam(e.target.value);
        const query = e.target.value.toLowerCase();
        let filteredData = [];
        if (query.length > 1) {
            filteredData = posts?.length ? posts.filter(post => post.title.toLowerCase().indexOf(query) > -1) : [];
            setIsSearching(true);
            setFilteredPosts(filteredData);
        } else {
            setFilteredPosts([]);
            setIsSearching(false);
        }
    }

    return (
        <div className="searchbar-container">
            <input onChange={handleChange} type="text" value={searchParam} placeholder="Search by post title..." />
        </div>
    );
}

export default SearchBar