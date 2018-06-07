import React, {Component} from 'react';
import './MainPage.css';
import background_img from '../assets/background.png';
import background_img2 from '../assets/background2.png';
import logo from '../assets/logo.png';
import {Parallax} from "react-scroll-parallax";
import Trailer from "./trailer/Trailer";
import Subscribe from "./subscribe/Subscribe";
import ScrollArea from './scrollAreaLib/ScrollArea';

class MainPage extends Component {

    constructor() {
        super();

        this.state = {
            subscriptionText: '',
            width: window.innerWidth
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        const newWidth = window.innerWidth;
        console.warn("New width: " + newWidth);
        this.setState({
            width: newWidth
        });
    }


    render() {
        return (
            <div className='MainPage'>
                {/*<div className='MainPage__sky'/>*/}
                {/*<div className='MainPage__background__wall'/>*/}
                <ScrollArea
                    speed={0.8}
                    className="MainPage__scrollArea"
                    contentClassName="MainPage__scrollWrapper"
                    horizontal={true}
                    vertical={false}
                    swapWheelAxes={true}
                    forceWidth={2 * this.state.width}
                    smoothScrolling
                >
                    <Trailer
                        width={this.state.width}
                    />
                    <Subscribe
                        width={this.state.width}
                    />
                </ScrollArea>
            </div>
        )
    }
}

export default MainPage;


// return (
//     <div className='MainPage'>
//         {/* Top image*/}
//         <div className='MainPage__header'>
//             <div className='MainPage__background'/>
//
//             {/* Title */}
//             <Parallax
//                 offsetYMin={-150}
//                 offsetYMax={100}
//                 className='MainPage__background__parallax'
//             >
//                 <img src={logo}/>
//             </Parallax>
//         </div>
//
//         <div className='MainPage__submitForm'>
//             {/*MailChimp signUp form*/}
//             <div id='mc_embed_signup' className="MainPage__subscribe">
//                 <form method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
//                       action="https://ministryofbroadcast.us18.list-manage.com/subscribe/post?u=3a04c6ba139b2a873a72515e4&amp;id=4ea83437ad"
//                       className="validate" target="_blank" noValidate>
//                     <div id="mc_embed_signup_scroll">
//                         <label htmlFor="mce-EMAIL">Sign up for news and updates</label>
//                         <input type="email" value={this.state.subscriptionText} name="EMAIL" className="email" id="mce-EMAIL"
//                                placeholder="email address" required
//                                onChange={(event) => this.setState({subscriptionText: event.target.value})}
//                         />
//                         {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
//                         <div className='MainPage__subscribe__hidden' aria-hidden="true">
//                             <input type="text" name="b_3a04c6ba139b2a873a72515e4_4ea83437ad" tabIndex="-1"
//                                    value=""/>
//                         </div>
//                         <div className="clear">
//                             <input type="submit" value="Subscribe" name="subscribe"
//                                    id="mc-embedded-subscribe" className="button"/>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             {/*End mc_embed_signup*/}
//         </div>
//     </div>
// )
