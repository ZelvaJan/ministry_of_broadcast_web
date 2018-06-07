import React, {Component} from 'react';
import './Subscribe.css';
import PropTypes from "prop-types";
import logoV2 from '../../assets/logo_v2.png';
import warnSign from '../../assets/warn_sign.png';

class Subscribe extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    constructor() {
        super();

        this.state = {
            subscriptionText: ''
        }
    }

    render() {
        return (
            <div className='Subscribe__root' style={{minWidth: this.props.width}}>
                <div className='page__header Subscribe__header'>
                    <span>THE GAME</span>
                    <span className='page__header__selected'>SUBSCRIBE</span>
                    <img src={logoV2} className='page__header_logo'/>
                    <span>ABOUT</span>
                    <span>BE A PART</span>
                </div>


                {/*MailChimp signUp form*/}
                <div id='mc_embed_signup' className="Subscribe__wrapper">
                    <form method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                          action="https://ministryofbroadcast.us18.list-manage.com/subscribe/post?u=3a04c6ba139b2a873a72515e4&amp;id=4ea83437ad"
                          className="validate" target="_blank" noValidate>
                        <div id="mc_embed_signup_scroll">
                            {/*<label htmlFor="mce-EMAIL">Sign up for news and updates</label>*/}
                            <input type="email" value={this.state.subscriptionText} name="EMAIL"
                                   className="email" id="mce-EMAIL" placeholder="email address" required
                                   onChange={(event) => this.setState({subscriptionText: event.target.value})}
                            />
                            {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                            <div className='Subscribe__hidden' aria-hidden="true">
                                <input type="text" name="b_3a04c6ba139b2a873a72515e4_4ea83437ad" tabIndex="-1"
                                       value=""/>
                            </div>
                            <div className="clear">
                                <input type="submit" value="OK" name="subscribe"
                                       id="mc-embedded-subscribe" className="button"/>
                            </div>
                        </div>
                    </form>
                    <img className='Subscribe__warnSign' src={warnSign}/>
                </div>
            </div>
        )
    }
}

export default Subscribe;

