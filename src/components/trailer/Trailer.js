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
            autoplay: 1
        }
    }

    render() {


        return (
            <div className='Trailer__root' style={{minWidth: this.props.width}}>
                <div className='Trailer__header'>
                    <span>THE GAME</span>
                    <span>SUBSCRIBE</span>
                    <img src={logoV2} className='Trailer__logo'/>
                    <span>ABOUT</span>
                    <span>BE A PART</span>
                </div>

                <div className='Trailer__video'>
                    <YouTube
                        videoId="a64MUU0RgoQ"
                        opts={this.videoOpts}
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