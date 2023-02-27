import { action, makeAutoObservable } from 'mobx';
import * as agent from '../apis/agent';
const profileStore = makeAutoObservable({
    profile: {
        username: '',
        following: false,
        unfollow: undefined,
        follow: undefined,
        image: undefined,
        bio: undefined,
    },
    isLoadingProfile: false,
    loadProfile(username: string) {
        this.isLoadingProfile = true;
        return agent.profile
            .get(username)
            .then(
                action(({ profile }) => {
                    this.profile = profile;
                })
            )
            .finally(
                action(() => {
                    this.isLoadingProfile = false;
                })
            );
    },
    follow() {
        if (this.profile && !this.profile?.following) {
            this.profile.following = true;
            return agent.profile.follow(this.profile.username).catch(
                action(() => {
                    this.profile.following = false;
                })
            );
        }
    },
    unfollow() {
        if (this.profile?.following) {
            this.profile.following = false;
            return agent.profile.unfollow(this.profile.username).catch(
                action(() => {
                    this.profile.following = true;
                })
            );
        }
    },
});

export default profileStore;
