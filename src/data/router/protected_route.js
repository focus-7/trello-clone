import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { onAuthStateChanged } from "../firebase/auth";


const authChecker = (user) => {
    const result = user !== null;
    return result;
};

class ProtectedRoute extends Component {
    _isMounted = false;
    state = {
        authorized: false,
        loaded: false,
    };

    componentDidMount() {
        this._isMounted = true;
        onAuthStateChanged(async (user) => {
            const authorized = await authChecker(user);
            if (this._isMounted) {
                this.updateState(authorized);
            }

        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateState = (state) => {
        this.setState({
        authorized: state,
        loaded: true,
    });
    };

render() {
    const {
        component: Component,
        ...rest
    } = this.props;
    const { loaded, authorized } = this.state;
    if (!loaded) return <h1>Cargando...</h1>;
    return (
        <Route
            {...rest}
            render={props => {
                if (authorized) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }
                            } />
                    )
                }
            }}
        />
    );
}
}

export default ProtectedRoute;