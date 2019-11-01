import React, { useReducer, useEffect } from 'react';
import UserBar from './user/UserBar';
import PostList from './post/PostList';
import CreatePost from './post/CreatePost';
import appReducer from './reducers';

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
        <div style={{ padding: 8 }}>
            <UserBar user={user} dispatch={dispatch} />
            <br />
            {user && (
                <CreatePost user={user} dispatch={dispatch} posts={posts} />
            )}
            <br />
            <hr />
            <PostList posts={posts} />
        </div>
    );
}

export default App;
