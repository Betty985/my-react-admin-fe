import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useStores from "../../hooks/useStores";
import ListErrors from "../../components/ListErrors";
const SettingsForm: FC = () => {
  const { userStore } = useStores();
  const { currentUser } = useCurrentUser();
  const [image, setImage] = useState(currentUser?.image);
  const [username, setUsername] = useState(currentUser?.username);
  const [bio, setBio] = useState(currentUser?.bio);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const submitForm:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const user = { image, username, bio, email, password };
    if (!user.password) {
      delete user.password;
    }
    userStore.updateUser(user);
  };

  return (
    <>
      <ListErrors errors={userStore.updatingUserErrors} />
      <form onSubmit={submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={userStore.updatingUser}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  );
};
observer(SettingsForm);
export default SettingsForm;
