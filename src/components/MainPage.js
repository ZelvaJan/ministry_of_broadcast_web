import React, {Component} from 'react';
import './MainPage.css';
import background_img from '../assets/background.png';
import background_img2 from '../assets/background2.png';
import logo from '../assets/logo.png';
import {Parallax} from "react-scroll-parallax";
import Trailer from "./trailer/Trailer";
import Subscribe from "./subscribe/Subscribe";
import ScrollArea from './scrollAreaLib/ScrollArea';
import About from "./about/About";
import BePart from "./bePart/BePart";

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
                    forceWidth={4 * this.state.width}
                    smoothScrolling
                >
                    <Trailer
                        width={this.state.width}
                    />
                    <Subscribe
                        width={this.state.width}
                    />
                    <About
                        width={this.state.width}
                    />
                    <BePart
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
//         </div>
//     </div>
// )
