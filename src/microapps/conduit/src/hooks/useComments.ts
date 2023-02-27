import { useEffect, useState } from 'react';
import useStores from './useStores';
function useComments() {
    const { commentsStore } = useStores();
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [commentErrors, setCommentErrors] = useState('');
    const [body, setBody] = useState('');
    const [isCreatingComment, setCreatingComment] = useState(false);
    const createComment: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setCreatingComment(commentsStore.isCreatingComment);
        commentsStore.createComment({ body }).then(() => {
            setBody('');
            setCreatingComment(commentsStore.isCreatingComment);
        });
    };
    const handleDeleteComment = (id) => {
        commentsStore.deleteComment(id);
    };
    const onChange = (e) => setBody(e.target.value);
    useEffect(() => {
        commentsStore
            .loadComments()
            .then(() => {
                setComments(commentsStore.comments);
                setLoading(false);
            })
            .catch(() => {
                setCommentErrors(commentsStore.commentErrors);
            });
    }, []);
    return {
        comments,
        isLoading,
        commentErrors,
        isCreatingComment,
        body,
        onChange,
        createComment,
        handleDeleteComment,
    };
}
export default useComments;
