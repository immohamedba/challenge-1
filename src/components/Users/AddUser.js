import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
const AddUser = (props) => {
    const [entredUserName, setEnredUserName] = useState('');
    const [entredAge, setEnredAge] = useState('');
    const [error, setError] = useState('');

    const useNameChangeHandler = (event) => {
        setEnredUserName(event.target.value);
    }
    const useAgeChangeHandler = (event) => {
        setEnredAge(event.target.value);
    }

    const addUserHandler = (event) => {
        event.preventDefault();

        if (entredUserName.trim().length === 0 || entredAge.trim().length === 0) {
            setError({
                title: "Empty value",
                message: "Please enter a valid name and age  !"
            });
            return;
        }
        // to make sur entred Age is a number 
        if (+entredAge < 1) {
            setError({
                title: "invalid value",
                message: "age should be > 1 !"
            });
            return;
        }
        props.onAddUser(entredUserName, entredAge);
        setEnredUserName('');
        setEnredAge('');
    }
    const MyErrorHandler = () => {
        setError('');
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={MyErrorHandler} > </ErrorModal>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="usename">Username</label>
                    <input id="username" type="text" onChange={useNameChangeHandler} value={entredUserName} />
                    <label htmlFor="age">Age (year)</label>
                    <input id="age" type="number" onChange={useAgeChangeHandler} value={entredAge} />
                    <Button type="submit">Add User </Button>

                </form>
            </Card>
        </>

    );
};

export default AddUser;