import React, {Component} from 'react';
import './BePart.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';

class BePart extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    constructor() {
        super();
    }

    render() {
        return (
            <div className='BePart__root' style={{minWidth: this.props.width}}>
                <div className='page__header'>
                    <span>THE GAME</span>
                    <span>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span>ABOUT</span>
                    <span className='page__header__selected'>BE A PART</span>
                </div>

            </div>
        )
    }
}

export default BePart;

