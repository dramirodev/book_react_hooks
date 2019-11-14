import React from 'react';
import { usePostsState } from '../../hooks';
import Post from './Post';

export default function PostList() {
    const posts = usePostsState();

    return (
        <div>
            {posts.map((p, i) => {
                return <Post {...p} key={`post-${i}`} short={true} />;
            })}
        </div>
    );
}
