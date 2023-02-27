import useCurrentUser from "../../../hooks/useCurrentUser";
import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

const YourFeedTab: FC = ()=> {
    const { currentUser } =useCurrentUser()
    const location = useLocation()
    if (currentUser) {
        return (
            <li className="nav-item">
                <NavLink
                    className={({ isActive }) => {
                        isActive = location.search.match(/tab=(feed)/) ? true : false
                        return isActive ? 'nav-link active' : 'nav-link'
                    }
                    }
                    to={{
                        pathname: "/",
                        search: "?tab=feed"
                    }}
                >
                    Your Feed
                </NavLink>
            </li>
        );
    }
    return null;
};

const GlobalFeedTab: FC = () => {
    const location = useLocation()
    return (
        <li className="nav-item">
            <NavLink
                className={({ isActive }) => {
                    isActive = location.search.match(/tab=(feed|tag)/) ? false : true
                    return isActive ? 'nav-link active' : 'nav-link'
                }
                }
                to={{
                    pathname: "/",
                    search: "?tab=all"
                }}
            >
                Global Feed
            </NavLink>
        </li>
    );
};
interface B {
    tag: any
}
const TagFilterTab: FC<B> = props => {
    const { tag } = props
    return tag && (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound" /> {tag}
            </a>
        </li>
    );
};
export { YourFeedTab, GlobalFeedTab, TagFilterTab }