import React, { Component } from 'react';
import MediaCard from './card.js';

export class Moviecards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDetails: [],
            tvDetails: []
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                movieDetails: this.props.movieData,
                tvDetails: this.props.tvData
            }, () => { console.log(this.state.tvDetails) })
        }
    }

    render() {
        const { movieDetails, tvDetails } = this.state
        return (
            <div className="container">
                <div className="row">
                    {movieDetails && movieDetails.map((ele, index) => {
                        return (
                            <div style={{ margin: '10px', width: "30%" }} key={index}>
                                <MediaCard key={index} obj={ele}></MediaCard>
                            </div>
                        )
                    })}
                    {tvDetails && tvDetails.map((ele, index) => {
                        return (
                            <div style={{ margin: '10px', width: "30%" }} key={index}>
                                <MediaCard key={index} obj={ele}></MediaCard>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Moviecards;
