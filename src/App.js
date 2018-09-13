import React, {Component} from 'react';
import MainPage from "./components/MainPage";
import {ParallaxProvider} from 'react-scroll-parallax';
import {version} from '../package.json';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ParallaxProvider>
                    <MainPage/>
                </ParallaxProvider>
            </div>
        );
    }
}

export default App;


export function handleErrors(error) {
    console.error(error);
    try {
        window.gtag('event', 'exception', {
            'description': error ? JSON.stringify(error) : error,
            'version': version,
            'fatal': true
        });
    } catch (exception) {
        console.error(exception);
    }
}

/**
 * Parse value from url parameters by name
 * @param name name of url parameter
 * @returns {string|null} value of url parameter
 */
export function getURLParameter(name) {
    try {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    } catch (error) {
        handleErrors(error);
        return null;
    }
}