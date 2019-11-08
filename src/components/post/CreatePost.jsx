import React, { useEffect } from 'react';
import { useInput } from 'react-hookedup';
import { useNavigation } from 'react-navi';
import {
    useAPICreatePost,
    useDebouncedUndo,
    useDispatch,
    useUserState,
} from '../../hooks';

export default function CreatePost() {
    const { value: title, bindToInput: bindTitle } = useInput('');
    const [
        content,
        setContent,
        { undo, redo, canUndo, canRedo },
    ] = useDebouncedUndo();

    const [post, createPost] = useAPICreatePost();
    const dispatch = useDispatch();
    const user = useUserState();
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
        setContent(value);
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
