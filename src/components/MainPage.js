import React, {Component} from 'react';
import './MainPage.css';
import Trailer from "./trailer/Trailer";
import Subscribe from "./subscribe/Subscribe";
import ScrollArea from './scrollAreaLib/ScrollArea';
import About from "./about/About";
import Toy from "./toy/Toy";
import logoV2 from '../assets/logo_v2.png';
import {getURLParameter} from "../App";

const menuItem = {
    game: 1,
    subscribe: 2,
    about: 3,
    toy: 4,
};

class MainPage extends Component {

    constructor() {
        super();

        const thankYou = !!getURLParameter("thankYou");

        let isAlreadyLoaded = false;
        if (thankYou && typeof window !== 'undefined') {
            window.onload = () => {
                this.handleScrollToPosition(this.state.width);
                this.setState({isLoaded: true});
            }
        } else {
            console.error("Window is missing");
            isAlreadyLoaded = true;
        }

        this.state = {
            isLoaded: isAlreadyLoaded,
            width: window.innerWidth,
            menuSelected: menuItem.game,
            thankYou: thankYou
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
        const newWidth = Math.round(window.innerWidth);
        console.warn("New width: " + newWidth);
        this.setState({
            width: newWidth
        });
    }

    handleScrollToPosition = (position) => {
        console.log("New position: ", position);
        if (this.scrollArea && !isNaN(position)) {
            //console.warn("Manual scroll: " + position);
            this.scrollArea.scrollXTo(position);

            const {width} = this.state;
            if (position < (width/2)) {
                this.setState({menuSelected: menuItem.game})
            } else if (position >= (width/2) && position < (1.5 * width)) {
                this.setState({menuSelected: menuItem.subscribe})
            } else if (position >= (1.5 * width) && position < (2.5 * width)) {
                this.setState({menuSelected: menuItem.about})
            } else {
                this.setState({menuSelected: menuItem.toy})
            }
        } else {
            console.error("Missing scrollArea");
        }
    };

    handleOnScrollEvent = (value) => {
        console.log("New scroll event: ", value);
        if (this.scrollArea) {
            if (value && value.leftPosition) {
                console.log("Scroll: ", value);
                const {width} = this.state;
                if (value.leftPosition % width !== 0) {
                    const page = Math.round(value.leftPosition / width);
                    let sideVal = value.leftPosition - page * width;
                    if (Math.abs(sideVal) < 2) {
                        sideVal = 0;
                    }

                    //if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
                    if (!this.cooldownTimeout && !this.scrollTimeout) {
                        this.scrollArea.disableScroll(true);
                        this.scrollTimeout = setTimeout(() => {
                            this.cooldownTimeout = setTimeout(() => {
                                this.cooldownTimeout = null;
                                this.scrollArea.disableScroll(false);
                            }, 500);
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
        const {width, menuSelected, isLoaded} = this.state;
        const isVisible = isLoaded ? 'visible' : 'hidden';

        return (
            <div className='MainPage' style={{visibility: isVisible}}>
                {/*<div className='MainPage__sky'/>*/}
                {/*<div className='MainPage__background__wall'/>*/}
                <h1 className='hidden'>Ministry of broadcast - The Wall Show</h1>
                <h2 className='hidden'>brought by Twin Petes s.r.o.</h2>

                <div className='page__header'>
                    <span className={`${menuSelected === menuItem.game ? 'page__header__selected' : ''}`}
                          onClick={() => this.handleScrollToPosition(0)}>THE GAME</span>
                    <span className={`${menuSelected === menuItem.subscribe ? 'page__header__selected' : ''}`}
                          onClick={() => this.handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo' alt='Company logo'/>
                    <span className={`${menuSelected === menuItem.about ? 'page__header__selected' : ''}`}
                          onClick={() => this.handleScrollToPosition(2 * width)}>ABOUT</span>
                    <span className={`${menuSelected === menuItem.toy ? 'page__header__selected' : ''}`}
                          onClick={() => this.handleScrollToPosition(3 * width)}>THE TOY</span>
                </div>

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
                    <div className='wall_background'/>

                    <Trailer
                        width={this.state.width}
                    />
                    <Subscribe
                        width={this.state.width}
                        thankYou={this.state.thankYou}
                    />
                    <About
                        width={this.state.width}
                    />
                    <Toy
                        width={this.state.width}
                    />
                </ScrollArea>
            </div>
        )
    }
}

export default MainPage;


