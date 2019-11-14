import React, { Component } from 'react';
import MediaCard from './card.js';
import MovieHeader from './movieHeader.js';
import axios from 'axios';

export class ShowFavourites extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/get',
            {
                params: {
                    email: localStorage.getItem('userEmail')
                }
            }).then((res) => {
                console.log(res);
                this.setState({
                    items: res.data
                })
            }).catch((err) => {
                console.log(err.message)
            })
    }
    render() {
        const { items } = this.state
        console.log(items.length)
        return (
            <div>
                <MovieHeader></MovieHeader>
                <h2 style={{textAlign:"center"}}>Favourite List</h2>
                <div className="container">
                    <div className="row">
                        {items.length!==0 ? items.map((ele, index) => {
                            return (
                                <div className="col-lg-4" style={{ marginBottom: '20px' }} key={index}>
                                    <MediaCard obj={ele.movieObj}></MediaCard>
                                </div>
                            )
                        })
                            : <h2>No Favourites yet</h2>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowFavourites
