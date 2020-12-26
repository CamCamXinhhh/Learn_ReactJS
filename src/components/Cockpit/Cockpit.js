import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    //useEffect nhận vào 1 function run for every render cycle
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        toggleBtnRef.current.click();

        return () => {
            //clearTimeout(timer);
            console.log(['[Cockpit.js] cleanup work in useEffect']);
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');

        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    })

    //Dynamic setting CSS class name
    const assignedClasses = [];
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                onClick={props.clicked}
                // alt={this.state.showPersons}
                className={btnClass}
                ref={toggleBtnRef}
            >Toggle Persons
                </button>
            {/* <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer> */}

            <button onClick={authContext.login}>Log in</button>
        </div>
    )
}

export default React.memo(cockpit);