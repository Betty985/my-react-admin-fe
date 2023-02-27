import React, { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner"
import useStores from "../../../hooks/useStores";

const Tags: FC = () => {
    const { commonStore } = useStores();
    const [isLoadingTags,setIsLoadingTags]=useState(true)
    const [tags,setTags]=useState([])
    useEffect(() => {
        commonStore.loadTags().then(()=>{
            setTags(commonStore.tags)
            setIsLoadingTags(commonStore.isLoadingTags)
        })
    }, [])

    return (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                    {isLoadingTags ? <LoadingSpinner />
                        : tags.map(tag =>
                            <Link
                                to={{
                                    pathname: "/",
                                    search: "?tab=tag&tag=" + tag
                                }}
                                className="tag-default tag-pill"
                                key={tag}
                            >
                                {tag}
                            </Link>
                        )}
                </div>
            </div>
        </div>
    );
}

export default memo(Tags)