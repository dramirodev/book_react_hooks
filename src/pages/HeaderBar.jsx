import React, { useContext } from 'react';
import ChangeTheme from '../components/ChangeTheme';
import Header from '../components/Header';
import CreatePost from '../components/post/CreatePost';
import UserBar from '../components/user/UserBar';
import { StateContext, ThemeContext } from '../contexts';
import useWindows from '@rehooks/window-size';

export default function HeaderBar({ setTheme }) {
    const theme = useContext(ThemeContext);
    const { innerWidth } = useWindows();
    const mobile = innerWidth < 640;
    const { state } = useContext(StateContext);
    const { user } = state;

    return (
        <>
            <Header text="React Hooks Blog" />
            {!mobile && (
                <>
                    <ChangeTheme theme={theme} setTheme={setTheme} />
                    <br />
                </>
            )}
            <React.Suspense fallback={'Loading...'}>
                <UserBar />
            </React.Suspense>
            <br />
            {user && <CreatePost />}
            {!mobile && <br />}
            <hr />
        </>
    );
}
