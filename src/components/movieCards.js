import React, { Component } from 'react';
import MediaCard from './card.js';
import axios from 'axios';

export class Moviecards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDetails: [],
            tvDetails: [],
            pagenum: 1,
            discoverVal: '',
            sortbyval: ''
        }
    }
    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=29c9e53ed318cec7a149ca8536b1df16&page=${this.state.pageNumber}`)
            .then((res) => {
                console.log(res)
                this.setState({
                    movieDetails: res.data.results,
                })
            }).catch((err) => {
                console.log(err)
            })

    }

    discoverApi = () => {
        var url;
        if (this.state.sortbyval !== "") {
            url = `https://api.themoviedb.org/3/discover/${this.state.discoverVal}?api_key=29c9e53ed318cec7a149ca8536b1df16&sort_by=${this.state.sortbyval}&page=${this.state.pagenum}`
            console.log(url);
        }
        else {
            url = `https://api.themoviedb.org/3/discover/${this.state.discoverVal}?api_key=29c9e53ed318cec7a149ca8536b1df16&page=${this.state.pagenum}`
            console.log(url);
        }
        if (this.state.discoverVal === 'movie') {
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        movieDetails: res.data.results,
                        tvDetails: []
                    }, () => { console.log(this.state.movieDetails) })
                }).catch((err) => {
                    console.log(err)
                })
        }
        else if (this.state.discoverVal === 'tv') {
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        tvDetails: res.data.results,
                        movieDetails: []
                    }, () => { console.log(this.state.tvDetails) })
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                pagenum: this.props.page,
                discoverVal: this.props.discover,
                sortbyval: this.props.sortBy
            }, () => { this.discoverApi();console.log(this.props) })
        }
    }

    render() {
        const { movieDetails, tvDetails } = this.state
        return (
            <div className="container">
                <div className="row">
                    {movieDetails && movieDetails.map((ele, index) => {
                        return (
                            <div className="col-lg-4" style={{ marginBottom: '20px' }} key={index}>
                                <MediaCard key={index} obj={ele}></MediaCard>
                            </div>
                        )
                    })}
                    {tvDetails && tvDetails.map((ele, index) => {
                        return (
                            <div className="col-lg-4" style={{ marginBottom: '20px' }} key={index}>
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
