import React, { FC } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
interface A {
    article: any;
    onDelete: any;
    canModify: any
}
const ArticleActions: FC<A> = props => {
    const { article, onDelete, canModify } = props
    const handleDel = () => onDelete(article.slug)
    if (canModify) {
        return (
            <>
                <Link
                    to={`/editor/${article.slug}`}
                    className='btn btn-outline-secondary btn-sm'>
                    <i className="ion-edit" /> 编辑文章
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={handleDel}>
                    <i className="ion-trash-a" />删除文章
                </button>
            </>
        )
    }
    return <></>
}
interface B{
    article:any;
    canModify:any;
    onDelete:any;
}
const ArticleMeta:FC<B>=observer(props=>{
    const {article,canModify} = props;
    return (
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt="" />
        </Link>
  
        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
  
        <ArticleActions canModify={canModify} article={article} onDelete={props.onDelete} />
      </div>
    );
  })
  export default ArticleMeta