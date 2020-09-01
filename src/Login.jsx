import React, { useState } from "react";
import { signInWithEmailAndPassword } from "./data/firebase/auth/index";
import Portal from "./data/portal/Portal";

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const onChangeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const onChangePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }


    const onClickSigIn = async () => {
        try {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const result = await signInWithEmailAndPassword(email, password);
                if (result) history.push("/");
            } else {
                throw new Error("Por favor ingrese un correo con un formato válido");
            }
        } catch (error) {
            if (
                error.message ===
                "Invalid document reference. Document references must have an even number of segments, but usuarios has 1"
            ) {
                setMessageError("Es necesario que escribas un correo.");
            } else {
                setMessageError(error.message);
            }
            setShowError(true);
        }
    };

    const PopUpMessageError = ({ object, hook }) => {
        const { message } = object;
        const [dissmiss, setDissmiss] = hook;

        return <div>Mensaje de Error</div>;
    };



    return (
        <>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Trello Clone</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control" value={email} onChange={onChangeEmail} placeholder="Introduzca el correo electrónico" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={password} onChange={onChangePassword} placeholder="Introduzca la contraseña" />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={onClickSigIn}>Iniciar sesión</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
