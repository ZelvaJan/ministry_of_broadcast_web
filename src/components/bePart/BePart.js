import React, {Component} from 'react';
import './BePart.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';
import fbIcon from '../../assets/fb_icon.png';
import twitterIcon from '../../assets/twitter_icon.png';

class BePart extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,

        handleScrollToPosition: PropTypes.func.isRequired
    };


    render() {
        const {handleScrollToPosition, width} = this.props;

        return (
            <div className='BePart__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span onClick={() => handleScrollToPosition(0)}>THE GAME</span>
                    <span onClick={() => handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo' alt='Company logo'/>
                    <span onClick={() => handleScrollToPosition(2 * width)}>ABOUT</span>
                    <span onClick={() => handleScrollToPosition(3 * width)}
                          className='page__header__selected'>BE A PART</span>
                </div>

                <div>
                    <p className='BePart__title'>Be part of us...</p>
                    <p className='BePart__text'>If you didn't find something on this site or you are interested in
                        anything else, feel free to contact us:</p>
                    <div className='BePart__link__wrap'>
                        <a href="mailto:info@ministryofbroadcast.com">INFO@MINISTRYOFBROADCAST.COM</a>
                    </div>
                </div>

                <div className='BePart__footer'>
                    <p className='BePart__social__title'>Find us elsewhere:</p>
                    <div className='BePart__social__icons'>
                        <a href="https://www.facebook.com/twinpetes" target='_blank' rel="noopener noreferrer">
                            <img src={fbIcon} alt='Facebook link'/>
                        </a>
                        <a href="https://twitter.com/OfBroadcast" target='_blank' rel="noopener noreferrer">
                            <img src={twitterIcon} alt='Twitter link'/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BePart;

