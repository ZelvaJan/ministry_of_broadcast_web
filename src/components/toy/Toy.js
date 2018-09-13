import React, {Component} from 'react';
import './Toy.css';
import PropTypes from "prop-types";
import warnSign from '../../assets/warn_sign.png';
import tree_blurred from '../../assets/tree_blurred.png';
import poster from '../../assets/poster.png';

class Toy extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired
    };


    render() {

        return (
            <div className='Toy__root' style={{width: this.props.width}}>
                <img src={tree_blurred} className='Toy__tree__blurred' alt=''/>
                <img src={poster} className='Toy__poster' alt=''/>

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

