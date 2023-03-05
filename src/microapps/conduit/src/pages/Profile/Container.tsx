import ArticleList from '../../components/ArticleList';
import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import useArticles from '../../hooks/useArticles';
import { ArticlesCaller } from '../../typings';
import useProfile from '../../hooks/useProfile';
const Container: FC = () => {
    const { articlesStore } = useStores();
    const { profile } = useProfile();
    const { articles, isLoading } = useArticles(ArticlesCaller.PROFILE);
    const { totalPagesCount, page } = articlesStore;
    const location = useLocation();
    const handleSetPage = (page: number) => {
        articlesStore.setPage(page);
        articlesStore.loadArticles();
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                    <div className="articles-toggle">
                        <ul className="nav nav-pills outline-active">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => {
                                        isActive = /\/favorites/.test(location.pathname)
                                            ? false
                                            : true;
                                        return isActive ? 'nav-link active' : 'nav-link';
                                    }}
                                    to={`/@${profile.username}`}
                                >
                                    My Articles
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => {
                                        isActive = /\/favorites/.test(location.pathname)
                                            ? true
                                            : false;
                                        return isActive ? 'nav-link active' : 'nav-link';
                                    }}
                                    to={`/@${profile.username}/favorites`}
                                >
                                    Favorited Articles
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <ArticleList
                        articles={articles}
                        totalPagesCount={totalPagesCount}
                        onSetPage={handleSetPage}
                        loading={isLoading}
                        currentPage={page}
                    />
                </div>
            </div>
        </div>
    );
};

export default Container;
