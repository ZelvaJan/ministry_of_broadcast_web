import React, {Component} from 'react';
import './About.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';
import aboutTeam from '../../assets/about_team.gif';

class About extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,

        handleScrollToPosition: PropTypes.func.isRequired
    };

    render() {
        const {handleScrollToPosition, width} = this.props;

        return (
            <div className='About__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span onClick={() => handleScrollToPosition(0)}>THE GAME</span>
                    <span onClick={() => handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo' alt='Company logo'/>
                    <span onClick={() => handleScrollToPosition(2 * width)} className='page__header__selected'>ABOUT</span>
                    <span onClick={() => handleScrollToPosition(3 * width)}>BE A PART</span>
                </div>

                <div>
                    <p className='About__title'>WHO ARE WE?</p>
                    <p className='About__text'>We are small game dev studio from Czech Republic...</p>
                    <img src={aboutTeam} alt='Our team'/>
                </div>

                <div className='About__footer'>
                    <div className='About__footer__block'>
                        <p className='About__awards__title'>AWARDS:</p>
                        <div className='About__delimiter'/>
                        <p>Best Gameplay</p>
                        <p className='About__footer__hidden'>Game Access '18</p>
                    </div>

                    <div className='About__footer__block'>
                        <p className='About__nomination__title'>NOMINATIONS:</p>
                        <div className='About__delimiter'/>
                        <p>Best Game Art</p>
                        <p className='About__footer__hidden'>Game Access '18</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;

