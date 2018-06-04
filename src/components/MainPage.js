import React, {Component} from 'react';
import './MainPage.css';
import background_img from '../assets/background.png';
import background_img2 from '../assets/background2.png';
import logo from '../assets/logo.png';
import {Parallax} from "react-scroll-parallax";

class MainPage extends Component {
    render() {
        return (
            <div className='MainPage'>
                {/* Top image*/}
                <div className='MainPage__header'>
                    <div className='MainPage__background'/>

                    {/* Title */}
                    <Parallax
                        offsetYMin={-150}
                        offsetYMax={100}
                        className='MainPage__background__parallax'
                    >
                        <img src={logo}/>
                    </Parallax>
                </div>

                <div className='MainPage__submitForm'>
                    <form id="subscribe"
                          action=""
                          method="post" name="mc-embedded-subscribe-form" target="_blank">
                        <h3>Sign up for news and updates</h3>
                        <input className="text" id="mce-EMAIL" name="EMAIL" type="email"
                               placeholder="Enter your email"/>
                        <input className="submit" name="subscribe" type="submit" id="mc-embedded-subscribe"
                               value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default MainPage;
