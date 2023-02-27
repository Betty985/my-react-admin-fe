import { observable, action, reaction } from "mobx";
import * as agent from "../apis/agent";
import storage from "../hooks/storage";
class CommonStore {
  @observable appName = "Conduit";
  @observable token = storage.getItem("jwt");
  @observable appLoaded = false;
  @observable tags = [];
  @observable isLoadingTags = false;
  constructor() {
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          storage.setItem("jwt", token);
        } else {
          storage.removeItem("jwt");
        }
      }
    );
  }

  @action loadTags() {
    this.isLoadingTags = true;
    return agent.tags.getAll()
      .then(action(({ tags }) => {
         this.tags = tags; 
        }))
      .finally(action(() => { this.isLoadingTags = false; }))
  }
  @action setToken(token) {
    this.token = token;
    storage.setItem("jwt", token);
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}
const commonStore = new CommonStore();
export default commonStore;
