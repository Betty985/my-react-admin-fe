import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import useStores from "../../hooks/useStores";
import SettingsForm from "./SettingsForm";
const Settings: FC = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const handleClickLogout = () =>
    authStore.logout().then(() => navigate("/", { replace: true }));
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingsForm />
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={handleClickLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
