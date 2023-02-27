import { action, makeAutoObservable } from "mobx";
import * as agent from "../apis/agent";
import commonStore from "./commonStore";
import userStore from "./userStore";
const authStore = makeAutoObservable({
  inProgress: false,
  errors: undefined,
  values: {
    username: "",
    email: "",
    password: "",
  },
  setUsername(username) {
    this.values.username = username;
  },
  setEmail(email) {
    this.values.email = email;
  },
  setPassword(password) {
    this.values.password = password;
  },
  reset() {
    this.values.username = "";
    this.values.email = "";
    this.values.password = "";
  },
  login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.auth.login(this.values.email, this.values.password)
      .then(({ user }) => commonStore.setToken(user.token))
  .then(() => userStore.pullUser())
  .catch(
    action((err) => {
      this.errors = err;
      throw err;
    })
  )
  .finally(
    action(() => {
      this.inProgress = false;
    })
  );
  },
register() {
  this.inProgress = true;
  this.errors = undefined;
  return agent.auth.register(
    this.values.username,
    this.values.email,
    this.values.password
  )
    .then(({ user }) => commonStore.setToken(user.token))
    .then(() => userStore.pullUser())
    .catch(
      action((err) => {
        this.errors = err
        throw err;
      })
    )
    .finally(
      action(() => {
        this.inProgress = false;
      })
    );
},
logout() {
  commonStore.setToken(undefined);
  userStore.forgetUser();
  return Promise.resolve()
},
});
export default authStore;
