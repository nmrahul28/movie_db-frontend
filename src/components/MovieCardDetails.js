import React, { Component } from 'react'
import RecipeReviewCard from './favouriteCard.js';
export class MovieCardDetails extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        let obj=this.props.location.state.data;
        return (
            <div>
               <RecipeReviewCard movieObj={obj}></RecipeReviewCard> 
            </div>
        )
    }
}

export default MovieCardDetails;
