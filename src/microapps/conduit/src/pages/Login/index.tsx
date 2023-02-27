import React, { FC } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login: FC = () => {
  return (
    <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
  );
};
export default Login;
