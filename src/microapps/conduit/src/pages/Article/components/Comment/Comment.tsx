import { Link } from 'react-router-dom';
import React, { FC } from 'react';
interface A{
    onDelete:any;
    commentId:any;
    show:any
}
const DeleteButton:FC <A>= props => {
    const {onDelete,commentId,show}=props
    const handleClick = () => onDelete(commentId);
    if (show) {
      return  (
        <span className="mod-options">
          <i className="ion-trash-a" onClick={handleClick} />
        </span>
      );
    }
    return <></>;
  };
interface B{
    comment:any;
    currentUser:any;
    onDelete:any;
    slug:any

}
const Comment:FC<B> = props => {
   const {comment,currentUser,onDelete,slug}=props
  const show = currentUser?.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" alt="comment-author-img" />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton
          show={show}
          commentId={comment.id}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Comment;