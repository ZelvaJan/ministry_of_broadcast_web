import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Trailer.css';
import YouTube from 'react-youtube';
import tower_blurred from '../../assets/tower_blurred.png';
import poster from '../../assets/poster.png';
import board from '../../assets/board.png';
import tower from '../../assets/tower.png';
import badge_gameplay from '../../assets/best_gameplay.png';
import badge_art from '../../assets/best_art.png';

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

    render() {
        const {width} = this.props;

        let videoWidth = 512;
        if (width < 600) {
            videoWidth = 224;
        } else if (width < 850) {
            videoWidth = 448;
        }
        let videoHeight = videoWidth / 16 * 9;
        const videoOpts = {
            height: videoHeight,
            width: videoWidth,
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        // TODO Video on safari doesn't load. Put some placeholder and link instead.
        return (
            <div className='Trailer__root' style={{width: this.props.width}}>
                <p className='Trailer__title'>Ministry of Broadcast is narrative-drive indie single-player 2D pixel art
                    platform game. The story is set in a country which has been divided by the walls and the only way
                    how to cross the borders to the other side is to win in a TV reality show. The overall mood and tone
                    is dark like Orwell’s 1984 combined with the hypocritical shine and glamour of the modern TV reality
                    shows. Even though it is touching some of the dark themes, game is fun, sarcastic and it plays jokes
                    on game characters, but also on the gamers.</p>

                <p className='Trailer__title__small'>
                    Ministry of Broadcast is narrative-drive indie single-player 2D pixel art
                    platform game. The story is set in a country which has been divided by the walls and the only way
                    how to cross the borders to the other side is to win in a TV reality show.
                </p>

                <div className='Trailer__content'>
                    <img src={tower_blurred} className='Trailer__tower__blurred' alt=''/>
                    <img src={poster} className='Trailer__poster' alt=''/>
                    <img src={board} className='Trailer__board' alt=''/>

                    <div className='Trailer__video__wrapper'>
                        <YouTube
                            videoId="a64MUU0RgoQ"
                            opts={videoOpts}
                            className='Trailer__video'
                            // https://github.com/troybetz/react-youtube
                        />
                    </div>

                    <div className='Trailer__footer'>
                        <div className='Trailer__badge__wrapper'>
                            <img src={badge_gameplay} className='Trailer__badge' alt='Best gameplay award winner' />
                        </div>
                        <div className='Trailer__badge__wrapper'>
                            <img src={badge_art} className='Trailer__badge' alt='Best art nominee' />
                        </div>
                    </div>

                    <img src={tower} className='Trailer__bg__tower' alt=''/>
                </div>

                <div className='Trailer__scrollText'>Scroll to see more...</div>
            </div>
        )
    }
}

export default Trailer;

/*
<div className='Trailer__badge'/>
<div className='Trailer__badge'/>



*/
/*
<img src={badge_gameplay} className='Trailer__badge' alt='Best gameplay award winner' />
<img src={badge_art} className='Trailer__badge' alt='Best art nominee' />

<img src={badge_gameplay} className='Trailer__badge' alt='Best gameplay award winner' />
<img src={badge_art} className='Trailer__badge' alt='Best art nominee' />
*/