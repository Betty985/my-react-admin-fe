export enum ArticlesCaller {
    HOME = 1,
    PROFILE = 2,
}
export enum SubmitCaller {
    LOGIN = 1,
    REGISTER = 2,
    EDITOR = 3,
}
export type Profile = {
    username: string;
    bio: string;
    image: string;
    following: boolean;
};
export interface ProfileType {
    profile: Profile;
}
export type Article = {
    slug: string;
    title: string;
    description: string;
    body: any;
    tagList: string[];
    createdAt?: string;
    updatedAt?: string;
    favorited?: boolean;
    favoritesCount?: number;
    author?: Profile;
};
export interface ArticleType {
    article: Article;
}
export interface ArticlesType {
    articles: Article[];
    articlesCount: number;
}
export type User = {
    image: string | null;
    username: string;
    bio: string;
    email: string;
    password: string;
    token: string;
};
export interface UserType {
    user: User;
}
export type Comment = {
    id: number;
    body: any;
    createdAt: string;
    updatedAt: string;
    author: string;
};
export interface CommentType {
    comment: Comment;
}
export interface CommentsType {
    comments: Comment[];
}
