import React, { useContext } from 'react';
import { StateContext } from '../../contexts';
import Login from './Login';

import Register from './Register';

const Logout = React.lazy(() => import('./Logout'));
export default function UserBar() {
    const { state } = useContext(StateContext);
    const { user } = state;
    if (user) {
        return <Logout />;
    }
    return (
        <>
            <Login />
            <Register />
        </>
    );
}
