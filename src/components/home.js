import React, { Component } from 'react'
import fireAuth from '../configuration/authenticationConfig';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Moviecards from './movieCards.js';
import ProtectedRoute from './ProtectedRoute.js';

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            movie_data: [],
            tv_data: [],
            value: '',
            sortby: '',
            totalData:[]
        }
    }

    componentDidMount() {
        // if (!localStorage.getItem('userEmail')) {
        //     this.props.history.push('/')
        // }
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=29c9e53ed318cec7a149ca8536b1df16')
                .then((res) => {
                    console.log(res)
                    this.setState({
                        movie_data: res.data.results,
                        // tv_data: []
                    })
                }).catch((err) => {
                    console.log(err)
                })
        
    }
    logout = () => {
        fireAuth.auth().signOut();
        this.props.history.push('/')
    }

    discoverApi = () => {
        var url;
        if (this.state.sortby !== "") {
            url = `https://api.themoviedb.org/3/discover/${this.state.value}?api_key=29c9e53ed318cec7a149ca8536b1df16&sort_by=${this.state.sortby}`
        }
        else {
            url = `https://api.themoviedb.org/3/discover/${this.state.value}?api_key=29c9e53ed318cec7a149ca8536b1df16`
        }
        if (this.state.value === 'movie') {
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        movie_data: res.data.results,
                        tv_data: []
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
                        movie_data: []
                    }, () => { console.log(this.state.tv_data) })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    handleChangeDiscover = (e) => {
        this.setState({
            value: e.target.value,
        }, () => { this.discoverApi() })
    }
    handleChangeSortby = (e) => {
        this.setState({
            sortby: e.target.value,
        }, () => { this.discoverApi() })
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <h2 variant="h6" >TMoviedb</h2>&emsp;
                        <label>
                            <select style={{ marginRight: '20px' }} color="inherit" value={this.state.value} onChange={this.handleChangeDiscover}>
                                <option value="">Discover</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Series</option>
                            </select>
                        </label>
                        <label>
                            <select style={{ marginRight: '20px' }} color="inherit" value={this.state.sortby} onChange={this.handleChangeSortby}>
                                <option value="">SortBy</option>
                                <option value="popularity.desc">Popularity Ascending</option>
                                <option value="popularity.asc">Popularity Descinding</option>
                            </select>
                        </label>
                        <Button color="inherit" onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <h2 style={{ textAlign: 'center' }}> Welcome {localStorage.getItem('userEmail') && localStorage.getItem('userName')}</h2>
                <Moviecards movieData={this.state.movie_data} tvData={this.state.tv_data}></Moviecards>
            </div >
        )
    }
}
export default Home;
