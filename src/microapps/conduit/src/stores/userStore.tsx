import { action, makeAutoObservable } from 'mobx';
import { auth } from '../apis/agent';
import { User } from '@/typings';
const UserStore = makeAutoObservable({
    currentUser: null as User,
    loadingUser: false,
    updatingUser: false,
    updatingUserErrors: '',
    pullUser() {
        this.loadingUser = true;
        return auth
            .current()
            .then(
                action((user) => {
                    this.currentUser = user;
                })
            )
            .finally(
                action(() => {
                    this.loadingUser = false;
                })
            );
    },
    updateUser(newUser: User) {
        this.updatingUser = true;
        return auth
            .save(newUser)
            .then(
                action((user) => {
                    this.currentUser = user;
                })
            )
            .finally(
                action(() => {
                    this.updatingUser = false;
                })
            );
    },
    forgetUser() {
        this.currentUser = null;
    },
});
export default UserStore;
