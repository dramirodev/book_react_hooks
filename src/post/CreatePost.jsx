import React, { useState } from 'react';

export default function CreatePost({ user, setPosts, posts }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleTitle(evt) {
        setTitle(evt.target.value);
    }
    function handleContent(evt) {
        setContent(evt.target.value);
    }

    function handleCreate(event) {
        event.preventDefault();
        const newPost = {
            title,
            content,
            author: user,
        };
        setPosts([newPost, ...posts]);
    }

    return (
        <form onSubmit={handleCreate}>
            <div>
                Author:
                <b>{user}</b>
            </div>
            <div>
                <label htmlFor="create_title">Title</label>
                <input
                    type="text"
                    name="create_title"
                    id="create_title"
                    value={title}
                    onChange={handleTitle}
                />
            </div>
            <textarea value={content} onChange={handleContent} />
            <input type="submit" value="Create" />
        </form>
    );
}
