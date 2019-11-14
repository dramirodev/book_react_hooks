import React, { useMemo } from 'react';
import ConnectedTodoItem from '../containers/ConnectedTodoItem';
import { useSelector } from 'react-redux';

export default function TodoList() {
    const filter = useSelector((state) => state.filter);
    const todos = useSelector((state) => state.todos);
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter((t) => t.completed === false);
            case 'completed':
                return todos.filter((t) => t.completed === true);
            default:
            case 'all':
                return todos;
        }
    }, [filter, todos]);
    return filteredTodos.map((item) => (
        <ConnectedTodoItem {...item} key={item.id} />
    ));
}
