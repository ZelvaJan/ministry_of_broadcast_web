import React, {Component} from 'react';
import './About.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';

class About extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    constructor() {
        super();
    }

    render() {
        return (
            <div className='About__root' style={{minWidth: this.props.width}}>
                <div className='page__header About__header'>
                    <span>THE GAME</span>
                    <span>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span className='page__header__selected'>ABOUT</span>
                    <span>BE A PART</span>
                </div>

                <div>
                    <p className='About__title'>WHO ARE WE?</p>
                    <p className='About__text'>We are small game dev studio from Czech Republic...</p>
                </div>
            </div>
        )
    }
}

export default About;

