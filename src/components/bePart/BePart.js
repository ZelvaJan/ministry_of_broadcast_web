import React, {Component} from 'react';
import './BePart.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';

class BePart extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,

        handleScrollToPosition: PropTypes.func.isRequired
    };

    constructor() {
        super();
    }

    render() {
        const {handleScrollToPosition, width} = this.props;

        return (
            <div className='BePart__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span onClick={() => handleScrollToPosition(0)}>THE GAME</span>
                    <span onClick={() => handleScrollToPosition(width)}>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span onClick={() => handleScrollToPosition(2 * width)}>ABOUT</span>
                    <span onClick={() => handleScrollToPosition(3 * width)} className='page__header__selected'>BE A PART</span>
                </div>

            </div>
        )
    }
}

export default BePart;

