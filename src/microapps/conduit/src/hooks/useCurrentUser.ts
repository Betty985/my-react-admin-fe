import useStores from './useStores';
import { User } from '@/typings';
import { useEffect, useRef, useState } from 'react';
function useCurrentUser() {
    const { userStore } = useStores();
    const [currentUser, setUser] = useState<User>(userStore.currentUser);
    const userRef = useRef(currentUser);
    userRef.current = currentUser;
    useEffect(() => {
        userStore.pullUser().then(() => {
            setUser(userStore.currentUser);
        });
    }, [userStore]);
    return { currentUser: userRef.current };
}
export default useCurrentUser;
