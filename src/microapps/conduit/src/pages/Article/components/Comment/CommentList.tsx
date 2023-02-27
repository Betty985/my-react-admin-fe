import Comment from './Comment';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
interface A{
    currentUser:any;
    slug:any;
    onDelete:any;
    comments:any
}
const CommentList:FC<A> = observer(props => {
    const {currentUser,slug,onDelete,comments}=props
  return (
    <div>
      {
        comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={currentUser}
              slug={slug}
              key={comment.id}
              onDelete={onDelete}
            />
          );
        })
      }
    </div>
  );
});

export default CommentList;