import { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("http://localhost:4000/posts");
            const data = await res.json();
            setPosts(data.data);
        }
        fetchPosts();
    }, []);
    
    const renderPosts = Object.keys(posts).map( key => {
        return (
            <div 
                className="card" 
                style={{ width: "30%", marginBottom: "20px" }} 
                key={posts[key].id}
            >
                <div className="card-body">
                    <h3>{posts[key].title}</h3>
                    <CommentList postId={posts[key].id} />
                    <CommentCreate postId={posts[key].id} />
                </div>
            </div>
        );
    });

    return <div 
        className="d-flex flex-row flex-wrap justify-content-between"
    >
        {renderPosts}
    </div>
}

export default PostList;