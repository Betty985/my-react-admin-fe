import {
    ArticleType,
    UserType,
    User,
    ProfileType,
    ArticlesType,
    Article,
    CommentType,
    CommentsType,
} from '@/typings';
import request from './request';
const encode = encodeURIComponent;

const auth = {
    current: (): Promise<UserType> => request.get('/user'),
    login: (email: string, password: string): Promise<UserType> =>
        request.post('/users/login', { user: { email, password } }),
    register: (username: string, email: string, password: string): Promise<UserType> =>
        request.post('/users', { user: { username, email, password } }),
    save: (user: Partial<User>): Promise<UserType> => {
        return request.put('/user', { user });
    },
};

const tags = {
    getAll: (): Promise<{ tags: string[] }> => request.get('/tags'),
};
const limit = (count: number, p: number) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: Article) => Object.assign({}, article, { slug: undefined });

const articles = {
    all: (page: number, lim = 11): Promise<ArticlesType> =>
        request.get(`/articles?${limit(lim, page)}`),
    byAuthor: (author: string, page: number, lim = 5): Promise<ArticlesType> =>
        request.get(`/articles?author=${encode(author)}&${limit(lim, page)}`),
    byTag: (tag: string, page: number, lim = 10): Promise<ArticlesType> =>
        request.get(`/articles?tag=${encode(tag)}&${limit(lim, page)}`),
    del: (slug: string) => request.delete(`/articles/${slug}`),
    favorite: (slug: string) => request.post(`/articles/${slug}/favorite`),
    favoritedBy: (author: string, page: number, lim = 5) =>
        request.get(`/articles?favorited=${encode(author)}&${limit(lim, page)}`),
    feed: (page, lim = 10): Promise<ArticlesType> =>
        request.get(`/articles/feed?${limit(lim, page)}`),
    get: (slug): Promise<ArticleType> => request.get(`/articles/${slug}`),
    unfavorite: (slug) => request.delete(`/articles/${slug}/favorite`),
    update: (article: Article): Promise<ArticleType> =>
        request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    create: (article: {
        title: string;
        description: string;
        body: any;
        tagList?: string[];
    }): Promise<ArticleType> => request.post('/articles', { article }),
};

const comments = {
    create: (slug: string, comment: string): Promise<CommentType> =>
        request.post(`/articles/${slug}/comments`, { comment }),
    delete: (slug: string, commentId: number) =>
        request.delete(`/articles/${slug}/comments/${commentId}`),
    forArticle: (slug: string): Promise<CommentsType> => request.get(`/articles/${slug}/comments`),
};

const profile = {
    follow: (username: string): Promise<ProfileType> =>
        request.post(`/profiles/${username}/follow`),
    get: (username: string): Promise<ProfileType> => request.get(`/profiles/${username}`),
    unfollow: (username: string): Promise<ProfileType> =>
        request.delete(`/profiles/${username}/follow`),
};

export { auth, tags, articles, comments, profile };
