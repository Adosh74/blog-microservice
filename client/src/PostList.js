import { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:4002/posts");
            
            setPosts(res.data.data);
            console.log(res.data.data);
            
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
                    <CommentList comments={posts[key].comments} />
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