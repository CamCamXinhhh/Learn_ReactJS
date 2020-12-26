import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';

import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';


class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering ...');
        return (
            <React.Fragment>
                {/* <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
                </AuthContext.Consumer> */}

                {
                    this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
                }


                <p key="i1" onClick={this.props.click} >
                    My name is {this.props.name} and my age is {this.props.age}
                </p >
                <p key="i2">{this.props.children}</p>
                <input
                    key="i3"
                    // ref={(inputEl) => { this.inputElement = inputEl }}
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </React.Fragment>
        )
    }


}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);
// <div className={classes.Person}>
//import Auxiliary from '../../../hoc/Auxiliary';
