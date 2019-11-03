import React, { useEffect, useReducer, useState } from 'react';

import HeaderBar from './pages/HeaderBar';

import { StateContext, ThemeContext } from './contexts';
import appReducer from './reducers';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
function App() {
    const [theme, setTheme] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral',
    });
    const [state, dispatch] = useReducer(appReducer, {
        user: '',
        posts: [],
        error: '',
    });

    const { user, error } = state;

    useEffect(() => {
        if (user) {
            document.title = `${user} - React Hooks Blog`;
        } else {
            document.title = `React Hooks Blog`;
        }
    }, [user]);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            <ThemeContext.Provider value={theme}>
                <div style={{ padding: 8 }}>
                    <HeaderBar setTheme={setTheme} />
                    <PostPage id={'react-hooks'} />
                </div>
            </ThemeContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
