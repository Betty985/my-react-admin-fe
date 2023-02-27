import React, { FC } from "react";
import ListErrors from "../../components/ListErrors";
import { observer } from "mobx-react";
import useSubmit from "../../hooks/useSubmit";
import { SubmitCaller } from '../../typings'
const RegisterForm: FC = observer(() => {
    const {
        err,
        inProgress,
        values,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleSubmitForm
    } = useSubmit(SubmitCaller.REGISTER)
    return (
        <>
            <ListErrors errors={err} />
            <form onSubmit={handleSubmitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Your Name"
                            value={values.username}
                            onChange={handleUsernameChange}
                        />
                    </fieldset>

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
                        Sign Up
                    </button>
                </fieldset>
            </form>
        </>
    )
})
export default RegisterForm