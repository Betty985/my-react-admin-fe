import useStores from '../../hooks/useStores';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListErrors from '../../components/ListErrors';
import useSubmit from '../../hooks/useSubmit';
import { SubmitCaller } from '../../typings';
const EditorForm: FC = () => {
    const params = useParams();
    const [tagList, setTagList] = useState([]);
    const { editorStore } = useStores();
    const {
        err,
        inProgress,
        title,
        description,
        body,
        tagInput,
        setTagInput,
        handleSubmitForm,
        handleTitleChange,
        handleDescriptionChange,
        handleBodyChange,
        handleTagInputChange,
    } = useSubmit(SubmitCaller.EDITOR);

    const handleTagInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch (e.keyCode) {
            case 13: // Enter
            case 9: // Tab
            case 188: // ,
                if (e.keyCode !== 9) e.preventDefault();
                handleAddTag();
                break;
            default:
                break;
        }
    };

    const handleAddTag = () => {
        if (tagInput) {
            editorStore.addTag(tagInput.trim());
            setTagInput('');
            setTagList(editorStore.tagList);
        }
    };

    const handleRemoveTag = (tag: string) => {
        if (editorStore.inProgress) return;
        editorStore.removeTag(tag);
        setTagList(editorStore.tagList);
    };
    useEffect(() => {
        editorStore.setArticleSlug(params.slug);
        editorStore.loadInitialData();
    }, [params.slug]);
    return (
        <>
            <ListErrors errors={err} />
            <form>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Article Title"
                            value={title}
                            onChange={handleTitleChange}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="What's this article about?"
                            value={description}
                            onChange={handleDescriptionChange}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                            className="form-control"
                            rows={8}
                            placeholder="Write your article (in markdown)"
                            value={body}
                            onChange={handleBodyChange}
                            disabled={inProgress}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter tags"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onBlur={handleAddTag}
                            onKeyDown={handleTagInputKeyDown}
                            disabled={inProgress}
                        />

                        <div className="tag-list">
                            {tagList.map((tag) => {
                                return (
                                    <span className="tag-default tag-pill" key={tag}>
                                        <i
                                            className="ion-close-round"
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    </fieldset>

                    <button
                        className="btn btn-lg pull-xs-right btn-primary"
                        type="submit"
                        disabled={inProgress}
                        onClick={handleSubmitForm}
                    >
                        Publish Article
                    </button>
                </fieldset>
            </form>
        </>
    );
};
export default EditorForm;
