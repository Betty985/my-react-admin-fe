import ListErrors from "../../components/ListErrors";
import React, { FC } from "react";
import { observer } from "mobx-react";
import useSubmit from "../../hooks/useSubmit";
import { SubmitCaller } from '../../typings'
const LoginForm: FC = observer(() => {
    const {
        err,
        inProgress,
        values,
        handleEmailChange,
        handlePasswordChange,
        handleSubmitForm
    } = useSubmit(SubmitCaller.LOGIN)
    return (
        <>
            <ListErrors errors={err} />
            <form onSubmit={handleSubmitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleEmailChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handlePasswordChange}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={inProgress}
                    >
                        Sign In
                    </button>
                </fieldset>
            </form>
        </>
    );
})
export default LoginForm;

