import React, { useReducer, useEffect, useState } from 'react';
import UserBar from './components/user/UserBar';
import PostList from './components/post/PostList';
import CreatePost from './components/post/CreatePost';
import Header from './components/Header';
import appReducer from './reducers';
import { ThemeContext } from './contexts';
import ChangeTheme from './components/ChangeTheme';

const defaultPosts = [
    {
        title: 'React Hooks',
        content: 'The greatest thing since sliced bread!',
        author: 'Daniel Bugl',
    },
    {
        title: 'Using React Fragments',
        content: 'Keeping the DOM tree clean!',
        author: 'Daniel Bugl',
    },
];

function App() {
    const [theme, setTheme] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral',
    });
    const [state, dispatch] = useReducer(appReducer, {
        user: '',
        posts: defaultPosts,
    });
    const { user, posts } = state;

    useEffect(() => {
        if (user) {
            document.title = `${user} - React Hooks Blog`;
        } else {
            document.title = `React Hooks Blog`;
        }
    }, [user]);

    return (
        <ThemeContext.Provider value={theme}>
            <div style={{ padding: 8 }}>
                <Header text="React Hooks Blog" />
                <ChangeTheme theme={theme} setTheme={setTheme} />
                <br />
                <UserBar user={user} dispatch={dispatch} />
                <br />
                {user && (
                    <CreatePost user={user} dispatch={dispatch} posts={posts} />
                )}
                <br />
                <hr />
                <PostList posts={posts} />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
