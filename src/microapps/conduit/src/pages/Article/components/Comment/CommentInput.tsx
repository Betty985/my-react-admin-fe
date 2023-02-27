import React, { FC } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useComments from "../../../../hooks/useComments";
const CommentInput: FC = () => {
  const { isCreatingComment, body, onChange, createComment } = useComments();
  const { currentUser } = useCurrentUser();
  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment...."
          value={body}
          disabled={isCreatingComment}
          onChange={onChange}
          rows={3}
        />
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt="comment-author-img"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};
export default CommentInput;
