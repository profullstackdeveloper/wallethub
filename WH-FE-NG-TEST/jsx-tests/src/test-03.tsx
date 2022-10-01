/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

type User = {
    firstName: string;
    lastName: string;
    phone: string;
}

interface PhoneBookProp {
    addEntryToPhoneBook: (input: User) => void;
}

interface InformationTableProp {
    userList: User[];
}

function PhoneBookForm({ addEntryToPhoneBook }: PhoneBookProp) {



    const firstNameRef = React.useRef(null);
    const lastNameRef = React.useRef(null);
    const phoneRef = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const phone = phoneRef.current.value;
        addEntryToPhoneBook({
            firstName,
            lastName,
            phone
        })
    }

    return (
        <form onSubmit={e => handleSubmit(e)} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                defaultValue="Coder"
                ref={firstNameRef}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                defaultValue="Byte"
                ref={lastNameRef}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                defaultValue={"8885559999"}
                ref={phoneRef}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable(props: InformationTableProp) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.userList.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

function Application(props) {

    const [userList, setUserList] = React.useState([]);

    const addEntryToPhoneBook = (data) => {
        const temp = [...userList, data];
        temp.sort((former, latter) => former.lastName > latter.lastName ? 1 : -1);
        setUserList(temp);
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
            <InformationTable userList={userList} />
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);