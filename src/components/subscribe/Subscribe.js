import React, {Component} from 'react';
import './Subscribe.css';
import PropTypes from "prop-types";

class Subscribe extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    constructor() {
        super();

        this.state = {
            subscriptionText: ''
        }
    }

    render() {
        return (
            <div className='Subscribe__root' style={{minWidth: this.props.width}}>

            </div>
        )
    }
}

export default Subscribe;