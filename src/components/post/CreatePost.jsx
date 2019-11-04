import React, { useState, useContext, useEffect } from 'react';
import { useInput } from 'react-hookedup';
import { useNavigation } from 'react-navi';
import { useResource } from 'react-request-hook';
import { StateContext } from '../../contexts';
import useUndo from 'use-undo';
import { useDebouncedCallback } from 'use-debounce';

export default function CreatePost() {
    const { value: title, bindToInput: bindTitle } = useInput('');
    const [content, setInput] = useState('');
    const [
        undoContent,
        { set: setContent, undo, redo, canUndo, canRedo },
    ] = useUndo('');

    const [setDebounce, cancelDebounce] = useDebouncedCallback((value) => {
        setContent(value);
    }, 200);

    useEffect(() => {
        cancelDebounce();
        setInput(undoContent.present);
    }, [cancelDebounce, undoContent]);

    const { state, dispatch } = useContext(StateContext);
    const [post, createPost] = useResource(({ title, content, author }) => ({
        url: '/posts',
        method: 'post',
        data: { title, content, author },
    }));
    const { user } = state;
    const navigation = useNavigation();
    useEffect(() => {
        if (post && post.data) {
            dispatch({
                type: 'CREATE_POST',
                ...post.data,
            });
            navigation.navigate(`/view/${post.data.id}`);
        }
    }, [dispatch, navigation, post]);

    function handleContent(e) {
        const { value } = e.target;
        setInput(value);
        setDebounce(value);
    }
    function handleCreate(event) {
        event.preventDefault();
        createPost({ title, content, author: user });
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
                    {...bindTitle}
                />
            </div>
            <textarea value={content} onChange={handleContent} />
            <button type="button" onClick={undo} disabled={!canUndo}>
                Undo
            </button>
            <button type="button" onClick={redo} disabled={!canRedo}>
                Redo
            </button>
            <input type="submit" value="Create" />
        </form>
    );
}
