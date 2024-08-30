import { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
            setComments(res.data.data);
        }
        
        fetchData();
    }, [postId]);
    
    
    const renderComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return <ul>{renderComments}</ul>
}


export default CommentList;