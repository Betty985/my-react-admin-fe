import ArticleList from "../../../components/ArticleList";
import React, { FC } from "react";
import { observer } from "mobx-react";
import { YourFeedTab, GlobalFeedTab, TagFilterTab } from "./FeedTab";
import queryString from "query-string";
import useStores from "../../../hooks/useStores";
import { useLocation } from "react-router-dom";
import useArticles from "../../../hooks/useArticles";
import { ArticlesCaller } from "../../../typings";
const MainView: FC = observer(() => {
  const { articlesStore} = useStores();
  const location = useLocation();
  const { articles, isLoading } = useArticles(ArticlesCaller.HOME);
  const { page, totalPagesCount } = articlesStore;
  const handleSetPage = (page) => {
    articlesStore.setPage(page);
    articlesStore.loadArticles();
  };
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab />
          <GlobalFeedTab />
          <TagFilterTab tag={queryString.parse(location.search).tag} />
        </ul>
      </div>
      <ArticleList
        articles={articles}
        loading={isLoading}
        totalPagesCount={totalPagesCount}
        currentPage={page}
        onSetPage={handleSetPage}
      />
    </div>
  );
});
export default MainView;
