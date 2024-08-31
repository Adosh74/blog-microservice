
const CommentList = ({ comments }) => {
    
    const renderComments = comments.map(comment => {
        let content;

        if(comment.status === 'approved') content = comment.content
        if(comment.status === 'pending') content = 'This comment is waiting moderation'
        if(comment.status === 'rejected') content = 'This comment has been rejected'

        return <li key={comment.id}>{content}</li>
    });

    return <ul>{renderComments}</ul>
}


export default CommentList;