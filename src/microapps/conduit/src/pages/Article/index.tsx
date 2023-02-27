import React, { FC } from "react";
import RedError from "../../components/RedError";
import ArticleMeta from "./components/ArticleMeta";
import CommentContainer from "./components/Comment";
import useArticle from "../../hooks/useArticle";
import useCurrentUser from "../../hooks/useCurrentUser";
import useComments from "../../hooks/useComments";
import { observer } from "mobx-react";
const Article =observer( () => {
  const { markup, canModify, article, slug, handleDeleteArticle } =
    useArticle();
  const { comments, isLoading, handleDeleteComment, commentErrors } =
    useComments();
  const { currentUser } = useCurrentUser();
  if (!article) return <RedError message="无法加载文章" />;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            canModify={canModify}
            onDelete={handleDeleteArticle}
          />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div dangerouslySetInnerHTML={markup} />
          <ul className="tag-list">
            {article.tagList.map((tag) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="article-actions" />
      <hr />
      <div className="row">
        <CommentContainer
          comments={comments}
          errors={commentErrors}
          slug={slug}
          currentUser={currentUser}
          onDelete={handleDeleteComment}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});

export default Article;
