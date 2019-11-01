import React, { useState, useContext } from 'react';
import { StateContext } from '../../contexts';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    function handleTitle(evt) {
        setTitle(evt.target.value);
    }
    function handleContent(evt) {
        setContent(evt.target.value);
    }

    function handleCreate(event) {
        event.preventDefault();
        dispatch({
            type: 'CREATE_POST',
            title,
            content,
            author: user,
        });
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