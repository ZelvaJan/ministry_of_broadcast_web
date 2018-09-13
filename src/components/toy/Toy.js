import React, {Component} from 'react';
import './Toy.css';
import PropTypes from "prop-types";
import warnSign from '../../assets/warn_sign.png';

class Toy extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired
    };


    render() {

        return (
            <div className='Toy__root' style={{width: this.props.width}}>
                <div className='Toy__figure'/>

                <div className='Toy__button__wrapper'>
                    <a className="Toy__button" href="https://gum.co/ministryofbroadcast">PRE-ORDER</a>
                    <img className='Toy__warnSign' src={warnSign} alt=''/>
                </div>
            </div>
        )
    }
}

export default Toy;

