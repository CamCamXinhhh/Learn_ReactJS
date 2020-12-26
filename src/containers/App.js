import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    state = {
        persons: [
            { id: 'gf1', name: 'Max', age: 28 },
            { id: 'dr3', name: 'Tony', age: 20 },
            { id: 'cx2', name: 'Jax', age: 16 }
        ],
        otherState: 'some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedFromProps', props);

        //Return updated state
        return state;
    }

    //GIỜ KHÔNG DÙNG NỮA
    // componentWillMount() {
    //     console.log('[App.js] componentWillMount');
    // }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
    }

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        })
        const person = { ...this.state.persons[personIndex] };
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        })
    }

    deletePersonHandler = personIndex => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({
            persons: persons
        })
    }

    togglePersonHandler = () => {
        const { showPersons } = this.state;
        this.setState({
            showPersons: !showPersons
        })
    }

    loginHandler = () => {
        this.setState({ authenticated: true })
    }

    render() {
        console.log('[App.js] render');
        let persons = null;

        //If we want to show person div
        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangeHandler}
                isAuthenticated={this.state.authenticated}
            />
        }

        return (
            <Auxiliary>
                <button onClick={() => { this.setState({ showCockpit: false }) }}>Remove Cockpit</button>

                <AuthContext.Provider
                    value={{
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }}>

                    {this.state.showCockpit ? <Cockpit
                        personsLength={this.state.persons.length}
                        showPersons={this.state.showPersons}
                        clicked={this.togglePersonHandler}

                    /> : null}
                    {persons}
                </AuthContext.Provider>
            </Auxiliary>

        )
        //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does it work?'));
    }
}

export default withClass(App, classes.App);


