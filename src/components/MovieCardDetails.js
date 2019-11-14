import React, { Component } from 'react'
import FavoriteCard from './favouriteCard.js';
import MovieHeader from './movieHeader.js';

export class MovieCardDetails extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        return (
            <div>
                <MovieHeader></MovieHeader>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" style={{ marginTop: "30px", marginLeft: "8%" }}>
                            {this.props.location.state !== undefined
                                ? <FavoriteCard movieobj={this.props.location.state.data}></FavoriteCard>
                                : <h2 style={{ textAlign: "center" }}>404 Not Found</h2>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieCardDetails;
