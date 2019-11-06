import React, { Component } from 'react'
import fireAuth from '../configuration/authenticationConfig';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Moviecards from './movieCards.js';

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            movie_data: [],
            tv_data: [],
            value: ''
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('userEmail')) {
            this.props.history.push('/')
        }
    }
    logout = () => {
        fireAuth.auth().signOut();
        this.props.history.push('/')
    }

    discoverApi = () => {
        let url = `https://api.themoviedb.org/3/discover/${this.state.value}?api_key=29c9e53ed318cec7a149ca8536b1df16`
        if (this.state.value === 'movie') {
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        movie_data: res.data.results,
                        tv_data:[]
                    }, () => { console.log(this.state.movie_data) })
                }).catch((err) => {
                    console.log(err)
                })
        }
        else if (this.state.value === 'tv') {
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        tv_data: res.data.results,
                        movie_data:[]
                    }, () => { console.log(this.state.tv_data) })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        }, () => { this.discoverApi() })
    }
    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <h2 variant="h6" >TMoviedb</h2>&emsp;
                        <label>
                            <select color="inherit" value={this.state.value} onChange={this.handleChange}>
                                <option value="">Discover</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Series</option>
                            </select>
                        </label>
                        {/* <Button className=".button" color="inherit" onClick={this.discover}>Discover</Button> */}
                        <Button color="inherit" onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <h2 style={{ textAlign: 'center', color: 'blue' }}> Welcome {localStorage.getItem('userEmail') && localStorage.getItem('userName')}</h2>
                <Moviecards movieData={this.state.movie_data} tvData={this.state.tv_data}></Moviecards>
            </div >
        )
    }
}
export default Home;
