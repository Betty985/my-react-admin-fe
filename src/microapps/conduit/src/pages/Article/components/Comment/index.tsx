import React, { FC } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";
import ListErrors from "../../../../components/ListErrors";
interface A {
  currentUser: any;
  comments: any;
  slug: any;
  onDelete: any;
  errors: any;
  isLoading: boolean;
}
const CommentContainer: FC<A> = (props) => {
  const { comments, slug, currentUser, onDelete, errors, isLoading } = props;
  const isLoggin = currentUser;
  const input = (
    <div>
      <ListErrors errors={errors} />
      <CommentInput />
    </div>
  );
  const info = (
    <p>
      <Link to="/login">Sign in</Link>
      &nbsp;or&nbsp;
      <Link to="/register">sign up</Link>
      &nbsp;to add comments on this article.
    </p>
  );
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {isLoggin ? input : info}
      {isLoading && <p>loading ...</p>}
      <CommentList
        comments={comments}
        slug={slug}
        currentUser={currentUser}
        onDelete={onDelete}
      />
    </div>
  );
};
export default CommentContainer;
