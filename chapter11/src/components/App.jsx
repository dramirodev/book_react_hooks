import React, { useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoFilter from '../components/TodoFilter';
import TodoList from '../components/TodoList';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { fetchTodos } from '../redux/actions';

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div style={{ width: 400 }}>
            <Header />
            <AddTodo />
            <hr />
            <TodoList />
            <hr />
            <TodoFilter />
        </div>
    );
}
