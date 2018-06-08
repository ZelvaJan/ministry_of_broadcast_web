import React, {Component} from 'react';
import './MainPage.css';
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
        if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
        if (this.cooldownTimeout) clearTimeout(this.cooldownTimeout);
    }

    updateWindowDimensions() {
        const newWidth = window.innerWidth;
        console.warn("New width: " + newWidth);
        this.setState({
            width: newWidth
        });
    }

    handleScrollToPosition = (position) => {
        if (this.scrollArea) {
            //console.warn("Manual scroll: " + position);
            this.scrollArea.scrollXTo(position);
        } else {
            console.error("Missing scrollArea");
        }
    };

    handleOnScrollEvent = (value) => {
        if (this.scrollArea) {
            if (value && value.leftPosition) {
                //console.log("Scroll: ", value);
                const {width} = this.state;
                if (value.leftPosition % width !== 0) {
                    const page = Math.round(value.leftPosition / width);
                    const sideVal = value.leftPosition - page * width;

                    //if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
                    if (!this.cooldownTimeout && !this.scrollTimeout) {
                        this.scrollArea.disableScroll(true);
                        this.scrollTimeout = setTimeout(() => {
                            this.cooldownTimeout = setTimeout(() => {
                                this.cooldownTimeout = null;
                                this.scrollArea.disableScroll(false);
                            }, 250);
                            let resultPos = page * width;
                            if (sideVal !== 0) {
                                if (sideVal > 0) {
                                    resultPos = (page + 1) * width;
                                } else {
                                    resultPos = (page - 1) * width;
                                }
                            }

                            //console.warn("Side val: " + sideVal + ". Result pos: " + resultPos);
                            this.handleScrollToPosition(resultPos);
                            this.scrollTimeout = null;
                        }, 120);
                    }
                }
            } else {
                console.log("Value didn't exists");
            }
        } else {
            console.error("Missing scrollArea");
        }
    };

    render() {
        return (
            <div className='MainPage'>
                {/*<div className='MainPage__sky'/>*/}
                {/*<div className='MainPage__background__wall'/>*/}
                <h1 className='hidden'>Ministry of broadcast - The Wall Show</h1>
                <h2 className='hidden'>brought by Twin Petes s.r.o.</h2>
                <ScrollArea
                    ref={scrollArea => {
                        this.scrollArea = scrollArea;
                    }}
                    speed={0.8}
                    className="MainPage__scrollArea"
                    contentClassName="MainPage__scrollWrapper"
                    horizontal={true}
                    vertical={false}
                    swapWheelAxes={true}
                    forceWidth={4 * this.state.width}
                    smoothScrolling
                    onScroll={this.handleOnScrollEvent}
                >
                    <Trailer
                        width={this.state.width}
                        handleScrollToPosition={this.handleScrollToPosition}
                    />
                    <Subscribe
                        width={this.state.width}
                        handleScrollToPosition={this.handleScrollToPosition}
                    />
                    <About
                        width={this.state.width}
                        handleScrollToPosition={this.handleScrollToPosition}
                    />
                    <BePart
                        width={this.state.width}
                        handleScrollToPosition={this.handleScrollToPosition}
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
