import React, { Component } from 'react'

export class Pagenation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageValue: 1
        }
    }
    componentDidMount() {
        this.props.getPageNumber(this.state.pageValue)
    }
    handlePrevious = () => {
        let { pageValue } = this.state
        if (pageValue > 1) {
            pageValue = pageValue - 1
            this.setState({
                pageValue: pageValue
            }, () => { this.props.getPageNumber(this.state.pageValue) })
        }
    }

    handleNext = () => {
        let { pageValue } = this.state
        pageValue = pageValue + 1
        this.setState({
            pageValue: pageValue
        }, () => { this.props.getPageNumber(this.state.pageValue) })
    }

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: '30px' }}>
                <button className="btn btn-info" type="submit" onClick={this.handlePrevious}>                                <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span></button>
                <span style={{marginLeft:'10px', marginRight:'10px'}}>{this.state.pageValue}</span>
                <button className="btn btn-info" type="submit" onClick={this.handleNext}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
        )
    }
}

export default Pagenation
