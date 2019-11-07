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


export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }
    getStateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    signIn = (e) => {
        const { email, password } = this.state
        e.preventDefault();
        fireAuth.auth().signInWithEmailAndPassword(email, password).then((res) => {
            localStorage.setItem('userEmail', res.user.email);
            localStorage.setItem('userName',res.user.displayName)
            console.log(res.user.displayName)
            this.props.history.push({ pathname: '/home', state: { name: res.user.displayName } })
        }).catch((err) => {
            alert(err.message)
        });
    }
    gotoSignup = () => {
        this.props.history.push('/signup')
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Login</h2>
                <form>
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
                    <Button style={{marginRight:'10px'}} variant="contained" color="primary" onClick={this.signIn}>Login</Button>
                    <Button variant="contained" color="primary" type='submit' onClick={this.gotoSignup}>new user?</Button>
                </form>
            </div>
        )
    }
}

export default Login;

