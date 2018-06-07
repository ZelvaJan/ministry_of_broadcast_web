import React, {Component} from 'react';
import MainPage from "./components/MainPage";
import {ParallaxProvider} from 'react-scroll-parallax';

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
