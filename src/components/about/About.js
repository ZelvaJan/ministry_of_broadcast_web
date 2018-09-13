import React, {Component} from 'react';
import './About.css';
import PropTypes from "prop-types";
import team from '../../assets/team.gif';

class About extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired
    };

    render() {
        const {} = this.props;

        return (
            <div className='About__root' style={{width: this.props.width}}>

                <div className='About__content'>
                    <p className='About__title'>WHO ARE WE?</p>
                    <p className='About__text'>We are small game dev studio from Czech Republic... <br/>
                        Does anyone really read this? If so, please let us know by email and we will be happy to answer
                        you all the questions in the world.
                    </p>

                    <div className='About__link__wrap'>
                        <a href="mailto:info@ministryofbroadcast.com">INFO@MINISTRYOFBROADCAST.COM</a>
                    </div>

                    <img className='About__room' src={team} alt='Our team'/>
                </div>
            </div>
        )
    }
}

export default About;

