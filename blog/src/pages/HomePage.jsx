import React, { useEffect, useContext } from 'react';
import { StateContext } from '../contexts';
import PostList from '../components/post/PostList';
import { useResource } from 'react-request-hook';

export default function HomePage() {
    const { state, dispatch } = useContext(StateContext);
    const { error } = state;
    
    const [posts, getPosts] = useResource(() => ({
        url: '/posts',
        method: 'get',
    }));

    useEffect(getPosts, []);
    useEffect(() => {
        if (posts && posts.error) {
            dispatch({ type: 'POSTS_ERROR' });
        }
        if (posts && posts.data) {
            dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() });
        }
    }, [dispatch, posts]);
    return (
        <>
            {error && <b>{error}</b>}
            <PostList />
        </>
    );
}
