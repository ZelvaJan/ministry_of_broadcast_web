import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Trailer.css';
import logoV2 from '../../assets/logo_v2.png';
import YouTube from 'react-youtube';

class Trailer extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    constructor() {
        super();

        this.state = {
            subscriptionText: ''
        }
    }

    videoOpts = {
        height: '360',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    }

    render() {


        return (
            <div className='Trailer__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span className='page__header__selected'>THE GAME</span>
                    <span>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span>ABOUT</span>
                    <span>BE A PART</span>
                </div>

                <div className='Trailer__video__wrapper'>
                    <YouTube
                        videoId="a64MUU0RgoQ"
                        opts={this.videoOpts}
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