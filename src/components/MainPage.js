import React, {Component} from 'react';
import './MainPage.css';
import Trailer from "./trailer/Trailer";
import Subscribe from "./subscribe/Subscribe";
import ScrollArea from './scrollAreaLib/ScrollArea';
import About from "./about/About";
import Toy from "./toy/Toy";
import logoV2 from '../assets/logo_v2.png';
import {getURLParameter} from "../App";

export const menuItem = {
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

    static canvas = null;
    static endAnimationCycle = false;
    static canvWidth = null;
    static canvHeight = null;

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.Snowy();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
        if (this.cooldownTimeout) clearTimeout(this.cooldownTimeout);
    }

    updateWindowDimensions() {
        MainPage.canvas.width = MainPage.canvWidth = window.innerWidth;
        MainPage.canvas.height = MainPage.canvHeight = window.innerHeight;
        MainPage.endAnimationCycle = true;
        this.Snowy();

        const newWidth = Math.round(window.innerWidth);
        console.warn("New width: " + newWidth);
        this.setState({
            width: newWidth
        });
    }

    Snowy = () => {
        MainPage.canvas = document.getElementById('canv');
        if (MainPage.canvas) {
            const $ = MainPage.canvas.getContext("2d");
            MainPage.canvWidth = MainPage.canvas.width = window.innerWidth;
            MainPage.canvHeight = MainPage.canvas.height = window.innerHeight;
            let f;

            const width = this.state.width;

            let snow, arr = [];
            let num = 600, sp = 1;
            let sc = 1.3, t = 0, mv = 10, min = 0.5, max = 2;
            if (width < 800) {
                num = 200;
                mv = 5;
            }

            for (let i = 0; i < num; ++i) {
                snow = new Flake();
                snow.y = Math.random() * (MainPage.canvHeight + 50);
                snow.x = Math.random() * MainPage.canvWidth;
                snow.t = Math.random() * (Math.PI * 2);
                snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
                snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
                snow.sp = snow.sp < min ? min : snow.sp;
                snow.sp = snow.sp > max ? max : snow.sp;
                // console.log(snow.sp);
                arr.push(snow);
            }
            go();

            function go() {
                if (!MainPage.endAnimationCycle) {
                    window.requestAnimationFrame(go);   // Request another animation step
                } else {
                    MainPage.endAnimationCycle = false;
                }

                $.clearRect(0, 0, MainPage.canvWidth, MainPage.canvHeight); // Clear canvas

                for (let i = 0; i < arr.length; ++i) { // Move flakes and draw them
                    f = arr[i];
                    f.t += .05;
                    f.t = f.t >= Math.PI * 2 ? 0 : f.t;
                    f.y += f.sp;
                    f.x = f.x + Math.random() * 1.5;
                    if (f.y > MainPage.canvHeight + 50) f.y = -10 - Math.random() * mv;
                    if (f.x > MainPage.canvWidth + mv) f.x = -mv;
                    if (f.x < -mv) f.x = MainPage.canvWidth + mv;
                    f.draw();
                }
            }

            function Flake() {
                this.draw = function () {
                    $.moveTo(this.x, this.y);
                    $.fillStyle = 'rgba(246, 249, 232, 1)';
                    $.beginPath();
                    if (this.sz > 8) {
                        this.sz = 8;
                    }
                    $.rect(this.x, this.y, this.sz, this.sz);
                    $.fill();
                }
            }
        }
    };

    updateMenuItem = (newItem) => {
        this.setState({menuSelected: newItem});
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
                          onClick={() => {if (this.scrollArea) this.scrollArea.scrollXTo(0)}}>THE GAME</span>
                    <span className={`${menuSelected === menuItem.subscribe ? 'page__header__selected' : ''}`}
                          onClick={() => {if (this.scrollArea) this.scrollArea.scrollXTo(width)}}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo' alt='Company logo'/>
                    <span className={`${menuSelected === menuItem.about ? 'page__header__selected' : ''}`}
                          onClick={() => {if (this.scrollArea) this.scrollArea.scrollXTo(2 * width)}}>ABOUT</span>
                    <span className={`${menuSelected === menuItem.toy ? 'page__header__selected' : ''}`}
                          onClick={() => {if (this.scrollArea) this.scrollArea.scrollXTo(3 * width)}}>THE TOY</span>
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
                    pageWidth={this.state.width}
                    forceWidth={4 * this.state.width}
                    smoothScrolling
                    updateMenuItem={this.updateMenuItem}
                >
                    <div className='snow_background'/>
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

                <canvas id='canv'/>
            </div>
        )
    }
}

export default MainPage;


