import React, {Component} from 'react';
import './About.css';
import PropTypes from "prop-types";
import team from '../../assets/team.gif';
import tree from '../../assets/tree.png';

class About extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired
    };

    render() {
        const {} = this.props;

        return (
            <div className='About__root' style={{width: this.props.width}}>
                <img src={tree} className='About__tree' alt=''/>

                <div className='About__content'>
                    <p className='About__text'>The Ministry of Broadcast game is developed by Twin Petes studio from
                        Brno, under creative direction of the Fuchs+Dachs studio from Prague. We are a small , but
                        diverse team of 4 with really strong synergy, different skillsets but same mindsets. Four people
                        with shared ideals, dreams, visions and love for internet profanity. Game designers,
                        advertisers, storytellers or technologists, artists or filmmakers, vegans or carnivores, boys or
                        girls, sex addicts or good Christians.<br/><span className='BOLD'>We tend to be all of above and then some.</span>
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

