import { useEffect, useState } from 'react';
import useStores from './useStores';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';
import { ArticlesCaller } from '../typings';
function useArticles(caller: ArticlesCaller) {
    const { articlesStore } = useStores();
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // tab和tag的状态
    const [state, setState] = useState({});
    const location = useLocation();
    const params = useParams();
    function getTab(): string {
        if (caller === ArticlesCaller.PROFILE) {
            if (/\/favorites/.test(location.pathname)) return 'favorites';
            return 'all';
        }
        if (caller === ArticlesCaller.HOME) {
            return (queryString.parse(location.search).tab as string) || 'all';
        }
    }
    useEffect(() => {
        articlesStore.setPredicate(getPredicate());
        articlesStore.loadArticles().then(() => {
            setArticles(articlesStore.articles);
            setLoading(articlesStore.isLoading);
        });
    }, [state, articlesStore]);
    useEffect(() => {
        if (JSON.stringify(state) !== JSON.stringify(getPredicate())) {
            setState(() => getPredicate());
            setLoading(true);
            articlesStore.setPredicate(getPredicate());
            articlesStore.loadArticles().then(() => {
                setArticles(articlesStore.articles);
                setLoading(articlesStore.isLoading);
            });
        }
    });

    const getPredicate = () => {
        const tab = getTab();
        if (caller === ArticlesCaller.HOME) {
            switch (tab) {
                case 'feed':
                    return { myFeed: true };
                case 'tag':
                    return {
                        tag: queryString.parse(location.search).tag,
                    };
                default:
                    return {};
            }
        }
        if (caller === ArticlesCaller.PROFILE) {
            switch (tab) {
                case 'favorites':
                    return { favoritedBy: params.username };
                default:
                    return { author: params.username };
            }
        }
    };
    return { articles, isLoading };
}
export default useArticles;
