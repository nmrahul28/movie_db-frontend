import React, { Component } from 'react';
import fireAuth from '../configuration/authenticationConfig.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

var textUseStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    getStateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    signUp = (e) => {
        const { email, password, name } = this.state
        e.preventDefault();
        fireAuth.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            localStorage.setItem('userEmail', res.user.email);
            this.props.history.push({ pathname: '/home', state: { name: name } })
            return res.user.updateProfile({
                displayName: name
            })
        }).catch((err) => {
            alert(err.message);
        });
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <form>
                    <h2>Signup</h2>
                    <TextField
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.getStateChange}
                        id="outlined-basic"
                        className={textUseStyles.textField}
                        label="Email"
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <TextField
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.getStateChange}
                        id="filled-basic"
                        className={textUseStyles.textField}
                        label="Password"
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <TextField
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.getStateChange}
                        className={textUseStyles.textField}
                        label="Name"
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <Button variant="contained" color="primary" type='submit' onClick={this.signUp}>Signup</Button>
                </form>
            </div>
        )
    }
}

export default Register;
