import useStores from './useStores';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FOLLOW_BTN, UNFOLLOW_BTN, INIT_BTN } from '../constant';
function useProfile() {
    const { profileStore, userStore } = useStores();
    const { currentUser } = userStore;
    const params = useParams();
    const [btnClasses, setBtn] = useState(INIT_BTN);
    const [profile, setProfile] = useState(profileStore.profile);
    const profileRef = useRef(profile);
    profileRef.current = profile;
    const [isAuthor, setIsAuthor] = useState(
        () => params?.username === userStore.currentUser?.username
    );
    const [isLoadingProfile, setLoadingProfile] = useState(true);
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (profile.following) {
            profileStore.unfollow(params.username).then(() => {
                setBtn(UNFOLLOW_BTN);
            });
        } else {
            profileStore.follow(params.username).then(() => {
                setBtn(FOLLOW_BTN);
            });
        }
    };
    useEffect(() => {
        profileStore.loadProfile(params.username).then(() => {
            setProfile(profileStore.profile);
            if (currentUser) {
                setIsAuthor(() => profileStore.profile.username === currentUser.username);
            } else {
                setIsAuthor(false);
            }
        });
    }, [currentUser, params.username]);
    useEffect(() => {
        setLoadingProfile(profileStore.isLoadingProfile);
    });

    return {
        isLoadingProfile,
        profile: profileRef.current,
        isAuthor,
        btnClasses,
        params,
        handleClick,
    };
}
export default useProfile;
