import React, { useContext } from 'react';
import Post from './Post';
import { StateContext } from '../../contexts';

export default function PostList() {
    const { state } = useContext(StateContext);
    const { posts } = state;

    return (
        <div>
            {posts.map((p, i) => {
                return <Post {...p} key={`post-${i}`} />;
            })}
        </div>
    );
}
