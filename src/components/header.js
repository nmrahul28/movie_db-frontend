import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import fireAuth from '../configuration/authenticationConfig';
import { withRouter } from 'react-router-dom';
import './home.css';

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            sortby: '',
        }
    }

    handleChangeDiscover = (e) => {
        this.setState({
            value: e.target.value,
        }, () => { this.props.getDiscover(this.state.value) })
    }

    handleChangeSortby = (e) => {
        this.setState({
            sortby: e.target.value,
        }, () => { this.props.getSortBy(this.state.sortby) })
    }
    favouriteList=()=>{
        this.props.history.push('/fav');
    }
    logout = () => {
        fireAuth.auth().signOut();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <h2 variant="h6" >TMoviedb</h2>&emsp;
                            <select className="dropbtn" style={{ marginRight: '20px' }} color="inherit" value={this.state.value} onChange={this.handleChangeDiscover}>
                            <option>Discover</option>
                            <option value="tv">TV Series</option>
                            <option value="movie">Movie</option>
                        </select>
                        <select className="dropbtn" style={{ marginRight: '20px' }} color="inherit" value={this.state.sortby} onChange={this.handleChangeSortby}>
                            <option>SortBy</option>
                            <option value="popularity.asc">Popularity Ascending</option>
                            <option value="popularity.desc">Popularity Descending</option>
                        </select>
                        <Button color="inherit" onClick={this.favouriteList}>Show Favourites</Button>
                        <Button color="inherit" onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <h2 style={{ textAlign: 'center' }}> Welcome {localStorage.getItem('userEmail') && localStorage.getItem('userName')}</h2>
            </div>
        )
    }
}

export default withRouter(Header)
