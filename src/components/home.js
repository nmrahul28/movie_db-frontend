import React, { Component } from 'react'
import Moviecards from './movieCards.js';
import Pagenation from './pageNation.js';
import Header from './header.js';
import './home.css';

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            sortby: '',
            pageNumber: 1,
        }
    }

    sortType = (sortOrder) => {
        this.setState({
            sortby: sortOrder
        })
    }
    discoverState = (category) => {
        this.setState({
            value: category
        }, () => { console.log(this.state.value) })
    }
    pageNo = (data) => {
        this.setState({
            pageNumber: data,
        })
    }
    render() {
        return (
            <div>
                <Header getDiscover={this.discoverState} getSortBy={this.sortType}></Header>
                <Moviecards page={this.state.pageNumber} discover={this.state.value} sortBy={this.state.sortby}></Moviecards>
                {this.state.value !== "" && this.state.value !== "Discover" ? <Pagenation getPageNumber={this.pageNo}></Pagenation>
                    : null}
            </div>
        )
    }
}
export default Home;
