import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Trailer.css';
import logoV2 from '../../assets/logo_v2.png';
import YouTube from 'react-youtube';

class Trailer extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,

        handleScrollToPosition: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {
            subscriptionText: ''
        }
    }

    render() {
        const {handleScrollToPosition, width} = this.props;
        const videoWidth = width > 640 ? 640 : width - 20;
        const videoOpts = {
            height: videoWidth / 16 * 9,
            width: videoWidth,
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        }

        return (
            <div className='Trailer__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span onClick={() => handleScrollToPosition(0)} className='page__header__selected'>THE GAME</span>
                    <span onClick={() => handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo' alt='Company logo'/>
                    <span onClick={() => handleScrollToPosition(2 * width)}>ABOUT</span>
                    <span onClick={() => handleScrollToPosition(3 * width)}>BE A PART</span>
                </div>

                <div className='Trailer__video__wrapper'>
                    <YouTube
                        videoId="a64MUU0RgoQ"
                        opts={videoOpts}
                        className='Trailer__video'
                        // https://github.com/troybetz/react-youtube
                    />
                </div>

                <div className='Trailer__scrollText'>Scroll to see more...</div>

                {/*<img className='Trailer__background' src={background}/>*/}

            </div>
        )
    }
}

export default Trailer;