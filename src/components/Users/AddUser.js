import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
const AddUser = (props) => {
    const [error, setError] = useState('');
    const nameInpurRef = useRef ();
    const ageInputRef = useRef ();

    const addUserHandler = (event) => {
        event.preventDefault();
        const entredUserName = nameInpurRef.current.value;
        const entredAge = ageInputRef.current.value;
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
        nameInpurRef.current.value ='';
        ageInputRef.current.value ='';
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
                    <input id="username" type="text" ref={nameInpurRef}  />
                    <label htmlFor="age">Age (year)</label>
                    <input id="age" type="number" ref={ageInputRef} />
                    <Button type="submit">Add User </Button>

                </form>
            </Card>
        </>

    );
};

export default AddUser;