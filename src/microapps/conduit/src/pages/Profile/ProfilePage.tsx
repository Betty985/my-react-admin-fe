import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import LoadingSpinner from "../../components/LoadingSpinner";
const ProfilePage: FC = () => {
  const {
    isLoadingProfile,
    profile,
    btnClasses,
    params,
    handleClick,
    isAuthor,
  } = useProfile();

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            {isLoadingProfile ? (
              <LoadingSpinner />
            ) : (
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" alt="" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                {isAuthor ? (
                  <Link
                    to="/settings"
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-gear-a" /> Edit Profile Settings
                  </Link>
                ) : (
                  <button className={btnClasses} onClick={handleClick}>
                    <i className="ion-plus-round" />
                    &nbsp;
                    {profile.following ? "Unfollow" : "Follow"}{" "}
                    {params.username}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
