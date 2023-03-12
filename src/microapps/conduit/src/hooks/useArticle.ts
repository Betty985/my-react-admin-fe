import { useEffect, useState } from 'react';
import useStores from './useStores';
import { useParams } from 'react-router-dom';
import useCurrentUser from './useCurrentUser';
import { marked } from 'marked';
import * as DOMPurify from 'dompurify';
function useArticle() {
    const { articlesStore, commentsStore } = useStores();
    const { currentUser } = useCurrentUser();
    const params = useParams();
    const handleDeleteArticle = (slug: string) => {
        articlesStore.deleteArticle(slug);
    };
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [article, setArticle] = useState(() => ({
        author: {
            bio: null,
            following: false,
            image: '',
            username: '',
        },
        body: '',
        tagList: [],
        title: '',
        createdAt: '',
        description: '',
        favorited: false,
        favoritesCount: 0,
        slug: '',
        updatedAt: '',
    }));
    const body = article?.body.replace(/\\n/g, '\n\n');
    const clean = DOMPurify.sanitize(marked.parse(body));
    const markup = { __html: clean };
    //   todo:类型
    const [canModify, setModify] = useState(false);
    const [slug, setSlug] = useState(params.id);
    useEffect(() => {
        setSlug(params.id);
        commentsStore.setArticleSlug(slug);
        articlesStore.loadArticles(slug, { acceptCached: true }).then(() => {
            setArticle(articlesStore.getArticle(slug));
            if (currentUser) {
                setModify(currentUser.username === article.author.username);
            }
        });
        commentsStore.loadComments().then(() => {
            setComments(commentsStore.comments);
            setLoading(false);
        });
    }, [params]);

    return { markup, canModify, article, slug, comments, isLoading, handleDeleteArticle };
}
export default useArticle;
