import React, {Component} from 'react';
import './About.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';

class About extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,

        handleScrollToPosition: PropTypes.func.isRequired
    };

    constructor() {
        super();
    }

    render() {
        const {handleScrollToPosition, width} = this.props;

        return (
            <div className='About__root' style={{minWidth: this.props.width}}>
                <div className='page__header About__header'>
                    <span onClick={() => handleScrollToPosition(0)}>THE GAME</span>
                    <span onClick={() => handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span onClick={() => handleScrollToPosition(2 * width)} className='page__header__selected'>ABOUT</span>
                    <span onClick={() => handleScrollToPosition(3 * width)}>BE A PART</span>
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

