import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodos } from '../redux/actions';

function TodoFilterItem({ name }) {
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    function handleFilter() {
        dispatch(filterTodos(name));
    }
    const style = {
        color: 'blue',
        cursor: 'pointer',
        fontWeight: filter === name ? 'bold' : 'normal',
    };

    return (
        <span style={style} onClick={handleFilter}>
            {name}
        </span>
    );
}

export default function TodoFilter() {
    return (
        <div>
            <TodoFilterItem name='all' />
            {'/'}
            <TodoFilterItem name='active' />
            {' / '}
            <TodoFilterItem name='completed' />
        </div>
    );
}
