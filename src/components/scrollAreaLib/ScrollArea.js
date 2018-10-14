import React from 'react';
import PropTypes from 'prop-types';
import './ScrollArea.css';
import lineHeight from 'line-height';
import {Motion, spring} from 'react-motion';

import {
    findDOMNode, warnAboutFunctionChild, warnAboutElementChild, positiveOrZero, modifyObjValues,
} from './utils';
import ScrollBar from './Scrollbar';
import {menuItem} from "../MainPage";

const eventTypes = {
    wheel: 'wheel',
    api: 'api',
    touch: 'touch',
    touchEnd: 'touchEnd',
    mousemove: 'mousemove',
    keyPress: 'keypress'
};

let resultMargin = null;

export default class ScrollArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topPosition: 0,
            leftPosition: 0,
            realHeight: 0,
            containerHeight: 0,
            realWidth: 0,
            containerWidth: 0
        };

        this.scrollArea = {
            refresh: () => {
                this.setSizesToState();
            },
            scrollTop: () => {
                this.scrollTop();
            },
            scrollBottom: () => {
                this.scrollBottom();
            },
            scrollYTo: (position) => {
                this.scrollYTo(position);
            },
            scrollLeft: () => {
                this.scrollLeft();
            },
            scrollRight: () => {
                this.scrollRight();
            },
            scrollXTo: (position) => {
                this.scrollXTo(position);
            },
            disableScroll: (disabled) => {
                this.disableScroll(disabled)
            }
        };
        this.scrollDisabled = false;

        this.evntsPreviousValues = {
            clientX: 0,
            clientY: 0,
            deltaX: 0,
            deltaY: 0
        };

        this.bindedHandleWindowResize = this.handleWindowResize.bind(this);
    }

    getChildContext() {
        return {
            scrollArea: this.scrollArea
        };
    }

    componentDidMount() {
        if (this.props.contentWindow) {
            this.props.contentWindow.addEventListener("resize", this.bindedHandleWindowResize);
        }
        this.lineHeightPx = lineHeight(findDOMNode(this.content));
        this.setSizesToState();
    }

    componentWillUnmount() {
        if (this.props.contentWindow) {
            this.props.contentWindow.removeEventListener("resize", this.bindedHandleWindowResize);
        }
    }

    componentDidUpdate() {
        this.setSizesToState();
    }

    render() {
        let {children, className, contentClassName, ownerDocument, forceWidth} = this.props;
        let withMotion = this.props.smoothScrolling &&
            (this.state.eventType === eventTypes.wheel || this.state.eventType === eventTypes.api || this.state.eventType === eventTypes.touchEnd ||
                this.state.eventType === eventTypes.keyPress);

        let scrollbarY = this.canScrollY() ? (
            <ScrollBar
                ownerDocument={ownerDocument}
                realSize={this.state.realHeight}
                containerSize={this.state.containerHeight}
                position={this.state.topPosition}
                onMove={this.handleScrollbarMove.bind(this)}
                onPositionChange={this.handleScrollbarYPositionChange.bind(this)}
                containerStyle={this.props.verticalContainerStyle}
                scrollbarStyle={this.props.verticalScrollbarStyle}
                smoothScrolling={withMotion}
                minScrollSize={this.props.minScrollSize}
                onFocus={this.focusContent.bind(this)}
                type="vertical"/>
        ) : null;

        let scrollbarX = this.canScrollX() ? (
            <ScrollBar
                ownerDocument={ownerDocument}
                realSize={this.state.realWidth}
                containerSize={this.state.containerWidth}
                position={this.state.leftPosition}
                onMove={this.handleScrollbarMove.bind(this)}
                onPositionChange={this.handleScrollbarXPositionChange.bind(this)}
                containerStyle={this.props.horizontalContainerStyle}
                scrollbarStyle={this.props.horizontalScrollbarStyle}
                smoothScrolling={withMotion}
                minScrollSize={this.props.minScrollSize}
                onFocus={this.focusContent.bind(this)}
                type="horizontal"/>
        ) : null;

        if (typeof children === 'function') {
            warnAboutFunctionChild();
            children = children();
        } else {
            warnAboutElementChild();
        }

        let classes = 'scrollarea ' + (className || '');
        let contentClasses = 'scrollarea-content ' + (contentClassName || '');

        let contentStyle = {
            marginTop: -this.state.topPosition,
            marginLeft: -this.state.leftPosition
        };
        let springifiedContentStyle = withMotion ? modifyObjValues(contentStyle, x => spring(x, {
            stiffness: 200,
            damping: 26,
            precision: 1
        })) : contentStyle;

        resultMargin = springifiedContentStyle.marginLeft;
        return (
            <Motion style={springifiedContentStyle}>
                {style => {
                    // TODO here you can update scroll speed
                    /*
                    if (style) {
                        style.marginLeft = Math.round(style.marginLeft);
                        if (!(prevValue === null)) {
                            if (Math.abs(prevValue - style.marginLeft) < 1) {
                                style.marginLeft = prevValue;
                            } else {
                                prevValue = style.marginLeft;
                            }
                        } else {
                            prevValue = style.marginLeft;
                        }
                    }
                    */
                    if (Math.abs(resultMargin.val - style.marginLeft) < 2) {
                        style.marginLeft = resultMargin.val;
                    }
                    return (
                        <div
                            ref={x => this.wrapper = x}
                            className={classes}
                            style={this.props.style}
                            onWheel={this.handleWheel.bind(this)}
                        >
                            <div
                                ref={x => this.content = x}
                                style={{...this.props.contentStyle, ...style, minWidth: forceWidth}}
                                className={contentClasses}
                                onTouchStart={this.handleTouchStart.bind(this)}
                                onTouchMove={this.handleTouchMove.bind(this)}
                                onTouchEnd={this.handleTouchEnd.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)}
                                tabIndex={this.props.focusableTabIndex}
                            >
                                {children}
                            </div>
                            {scrollbarY}
                            {scrollbarX}
                        </div>
                    )
                }
                }
            </Motion>
        );
    }

    setStateFromEvent(newState, eventType) {
        const {pageWidth} = this.props;

        if (this.props.onScroll) {
            this.props.onScroll(newState);
        }

       // this.setState({...newState, eventType});
        /* newState: {
        containerHeight: 544
        containerWidth: 320
        leftPosition: 10
        realHeight: 544
        realWidth: 1280
        topPosition: 0
        } */

        console.log("NewEvent: ", newState.leftPosition);
        const newLeftPos = (newState && newState.hasOwnProperty('leftPosition')) ? newState.leftPosition : null;
        const oldLeftPos = this.state.leftPosition;
        if (newLeftPos !== null) {
            //console.log("Scroll: ", newLeftPos);
            const positionDiff = newLeftPos - oldLeftPos;
            if (Math.abs(positionDiff) > 10) {
                // Determine end position
                const page = Math.round(oldLeftPos / pageWidth);
                let resultPos = page * pageWidth;
                if (eventType === eventTypes.api) { // Force new position. When clicked on link
                    resultPos = newLeftPos;
                } else {
                    resultPos = page * pageWidth;   // Calculate new position on scroll or touch
                    if (positionDiff > 0) {
                        resultPos = (page + 1) * pageWidth;
                    } else {
                        resultPos = (page - 1) * pageWidth;
                    }
                }

                console.log("New position: ", resultPos);
                if (resultPos < (pageWidth / 2)) {
                    this.props.updateMenuItem(menuItem.game)
                } else if (resultPos >= (pageWidth / 2) && resultPos < (1.5 * pageWidth)) {
                    this.props.updateMenuItem( menuItem.subscribe)
                } else if (resultPos >= (1.5 * pageWidth) && resultPos < (2.5 * pageWidth)) {
                    this.props.updateMenuItem(menuItem.about)
                } else {
                    this.props.updateMenuItem(menuItem.toy)
                }

                newState.leftPosition = resultPos;
                this.setState({...newState, eventType});
                /*
                //if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
                if (!this.cooldownTimeout && !this.scrollTimeout) {
                    this.scrollArea.disableScroll(true);
                    this.scrollTimeout = setTimeout(() => {
                        this.cooldownTimeout = setTimeout(() => {
                            this.cooldownTimeout = null;
                            this.scrollArea.disableScroll(false);
                        }, 350);
                        let resultPos = page * pageWidth;
                        if (sideVal !== 0) {
                            if (sideVal > 0) {
                                resultPos = (page + 1) * pageWidth;
                            } else {
                                resultPos = (page - 1) * pageWidth;
                            }
                        }

                        //console.warn("Side val: " + sideVal + ". Result pos: " + resultPos);
                        this.scrollTimeout = null;


                        console.log("New position: ", resultPos);
                        if (resultPos < (pageWidth / 2)) {
                            this.props.updateMenuItem(menuItem.game)
                        } else if (resultPos >= (pageWidth / 2) && resultPos < (1.5 * pageWidth)) {
                            this.props.updateMenuItem( menuItem.subscribe)
                        } else if (resultPos >= (1.5 * pageWidth) && resultPos < (2.5 * pageWidth)) {
                            this.props.updateMenuItem(menuItem.about)
                        } else {
                            this.props.updateMenuItem(menuItem.toy)
                        }

                        newState.leftPosition = resultPos;
                        this.setState({...newState, eventType});
                    }, 120);
                }
                */
            } else {
                console.log("Skip small change")
            }
        } else {
            console.error("Missing left position data");
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        e.stopPropagation();

        let {touches} = e;
        if (touches.length === 1) {
            let {clientX, clientY} = touches[0];
            this.eventPreviousValues = {
                ...this.eventPreviousValues,
                clientY,
                clientX,
                timestamp: Date.now()
            };
        }
    }

    handleTouchMove(e) {
    // TODO maybe touch start will be enough
        e.preventDefault();
        e.stopPropagation();
        // if (this.scrollDisabled || this.canScroll()) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }

        let {touches} = e;
        if (touches.length === 1) {
            let {clientX, clientY} = touches[0];

            let deltaY = this.eventPreviousValues.clientY - clientY;
            let deltaX = this.eventPreviousValues.clientX - clientX;

            this.eventPreviousValues = {
                ...this.eventPreviousValues,
                deltaY,
                deltaX,
                clientY,
                clientX,
                timestamp: Date.now()
            };

            //this.setStateFromEvent(this.composeNewState(-deltaX, -deltaY));
        }
    }

    handleTouchEnd(e) {
        // Disable event propagation
        e.preventDefault();
        e.stopPropagation();

        let {deltaX, deltaY, timestamp} = this.eventPreviousValues;
        if (typeof deltaX === 'undefined') deltaX = 0;
        if (typeof deltaY === 'undefined') deltaY = 0;
        if (Date.now() - timestamp < 200) {
           this.setStateFromEvent(this.composeNewState(-deltaX * 15, -deltaY * 10), eventTypes.touchEnd);
        }

        this.eventPreviousValues = {
            ...this.eventPreviousValues,
            deltaY: 0,
            deltaX: 0
        };
    }

    handleScrollbarMove(deltaY, deltaX) {
        this.setStateFromEvent(this.composeNewState(deltaX, deltaY));
    }

    handleScrollbarXPositionChange(position) {
        this.scrollXTo(position);
    }

    handleScrollbarYPositionChange(position) {
        this.scrollYTo(position);
    }

    handleWheel(e) {    // Handle wheel and also touchpad
        let deltaY = e.deltaY;
        let deltaX = e.deltaX;

        if (this.props.swapWheelAxes) {
            [deltaY, deltaX] = [deltaX, deltaY];
        }

        /*
         * WheelEvent.deltaMode can differ between browsers and must be normalized
         * e.deltaMode === 0: The delta values are specified in pixels
         * e.deltaMode === 1: The delta values are specified in lines
         * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
         */
        if (e.deltaMode === 1) {
            deltaY = deltaY * this.lineHeightPx;
            deltaX = deltaX * this.lineHeightPx;
        }

        deltaY = deltaY * this.props.speed;
        deltaX = deltaX * this.props.speed;

        // Horizontal and vertical scrolling - both update x axis
        // noinspection JSSuspiciousNameCombination
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            // noinspection JSSuspiciousNameCombination
            deltaX = deltaY;
        }
        // Skip small movements and repetitive events
        if (this.scrollDisabled || Math.abs(deltaX) < 35) {
            console.log("Skip scroll event");
            return;
        }

        let newState = this.composeNewState(-deltaX, -deltaY);

        if ((newState.topPosition && this.state.topPosition !== newState.topPosition) ||
            (newState.leftPosition && this.state.leftPosition !== newState.leftPosition) ||
            this.props.stopScrollPropagation) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setStateFromEvent(newState, eventTypes.wheel);
        this.focusContent();
    }

    handleKeyDown(e) {
        // only handle if scroll area is in focus
        if (e.target.tagName.toLowerCase() !== 'input' && e.target.tagName.toLowerCase() !== 'textarea' && !e.target.isContentEditable) {
            let deltaY = 0;
            let deltaX = 0;
            let lineHeight = this.lineHeightPx ? this.lineHeightPx : 10;

            switch (e.keyCode) {
                case 33: // page up
                    deltaY = this.state.containerHeight - lineHeight;
                    break;
                case 34: // page down
                    deltaY = -this.state.containerHeight + lineHeight;
                    break;
                case 37: // left
                    deltaX = lineHeight;
                    break;
                case 38: // up
                    deltaY = lineHeight;
                    break;
                case 39: // right
                    deltaX = -lineHeight;
                    break;
                case 40: // down
                    deltaY = -lineHeight;
                    break;
                default:
                    break;
            }

            // only compose new state if key code matches those above
            if (deltaY !== 0 || deltaX !== 0) {
                let newState = this.composeNewState(deltaX, deltaY);

                e.preventDefault();
                e.stopPropagation();

                this.setStateFromEvent(newState, eventTypes.keyPress);
            }
        }
    }

    handleWindowResize() {
        let newState = this.computeSizes();
        newState = this.getModifiedPositionsIfNeeded(newState);
        this.setStateFromEvent(newState);
    }

    composeNewState(deltaX, deltaY) {
        let newState = this.computeSizes();

        if (this.canScrollY(newState)) {
            newState.topPosition = this.computeTopPosition(deltaY, newState);
        } else {
            newState.topPosition = 0;
        }
        if (this.canScrollX(newState)) {
            newState.leftPosition = this.computeLeftPosition(deltaX, newState);
        }

        return newState;
    }

    computeTopPosition(deltaY, sizes) {
        let newTopPosition = this.state.topPosition - deltaY;
        return this.normalizeTopPosition(newTopPosition, sizes);
    }

    computeLeftPosition(deltaX, sizes) {
        let newLeftPosition = this.state.leftPosition - deltaX;
        return this.normalizeLeftPosition(newLeftPosition, sizes);
    }

    normalizeTopPosition(newTopPosition, sizes) {
        if (newTopPosition > sizes.realHeight - sizes.containerHeight) {
            newTopPosition = sizes.realHeight - sizes.containerHeight;
        }
        if (newTopPosition < 0) {
            newTopPosition = 0;
        }
        return newTopPosition;
    }

    normalizeLeftPosition(newLeftPosition, sizes) {
        if (newLeftPosition > sizes.realWidth - sizes.containerWidth) {
            newLeftPosition = sizes.realWidth - sizes.containerWidth;
        } else if (newLeftPosition < 0) {
            newLeftPosition = 0;
        }

        return newLeftPosition;
    }

    computeSizes() {
        let realHeight = this.content.offsetHeight;
        let containerHeight = this.wrapper.offsetHeight;
        let realWidth = this.content.offsetWidth;
        let containerWidth = this.wrapper.offsetWidth;

        return {
            realHeight: realHeight,
            containerHeight: containerHeight,
            realWidth: realWidth,
            containerWidth: containerWidth
        };
    }

    setSizesToState() {
        let sizes = this.computeSizes();
        if (Math.abs(sizes.realHeight - this.state.realHeight) >= 2 || Math.abs(sizes.realWidth - this.state.realWidth) >= 2) {
            this.setStateFromEvent(this.getModifiedPositionsIfNeeded(sizes));
        }

        /*
        if (sizes.realHeight !== this.state.realHeight || sizes.realWidth !== this.state.realWidth) {
            this.setStateFromEvent(this.getModifiedPositionsIfNeeded(sizes));
        }
        */
    }

    scrollTop() {
        this.scrollYTo(0);
    }

    scrollBottom() {
        this.scrollYTo((this.state.realHeight - this.state.containerHeight));
    }

    scrollLeft() {
        this.scrollXTo(0);
    }

    scrollRight() {
        this.scrollXTo((this.state.realWidth - this.state.containerWidth));
    }

    scrollYTo(topPosition) {
        if (this.canScrollY()) {
            let position = this.normalizeTopPosition(topPosition, this.computeSizes());
            this.setStateFromEvent({topPosition: position}, eventTypes.api);
        }
    }

    scrollXTo(leftPosition) {
        if (this.canScrollX()) {
            let position = this.normalizeLeftPosition(leftPosition, this.computeSizes());
            this.setStateFromEvent({leftPosition: position}, eventTypes.api);
        }
    }

    disableScroll(disabled) {
        this.scrollDisabled = disabled;
    }

    canScrollY(state = this.state) {
        let scrollableY = state.realHeight > state.containerHeight;
        return scrollableY && this.props.vertical;
    }

    canScrollX(state = this.state) {
        let scrollableX = state.realWidth > state.containerWidth;
        return scrollableX && this.props.horizontal;
    }

    canScroll(state = this.state) {
        return this.canScrollY(state) || this.canScrollX(state);
    }

    getModifiedPositionsIfNeeded(newState) {
        let bottomPosition = newState.realHeight - newState.containerHeight;
        if (this.state.topPosition >= bottomPosition) {
            newState.topPosition = this.canScrollY(newState) ? positiveOrZero(bottomPosition) : 0;
        }

        let rightPosition = newState.realWidth - newState.containerWidth;
        if (this.state.leftPosition >= rightPosition) {
            newState.leftPosition = this.canScrollX(newState) ? positiveOrZero(rightPosition) : 0;
        }

        return newState;
    }

    focusContent() {
        if (this.content) {
            findDOMNode(this.content).focus();
        }
    }
}

ScrollArea.childContextTypes = {
    scrollArea: PropTypes.object,
};

ScrollArea.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    speed: PropTypes.number,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    vertical: PropTypes.bool,
    verticalContainerStyle: PropTypes.object,
    verticalScrollbarStyle: PropTypes.object,
    horizontal: PropTypes.bool,
    horizontalContainerStyle: PropTypes.object,
    horizontalScrollbarStyle: PropTypes.object,
    onScroll: PropTypes.func,
    contentWindow: PropTypes.any,
    ownerDocument: PropTypes.any,
    smoothScrolling: PropTypes.bool,
    minScrollSize: PropTypes.number,
    swapWheelAxes: PropTypes.bool,
    stopScrollPropagation: PropTypes.bool,
    focusableTabIndex: PropTypes.number,
    forceWidth: PropTypes.number,
    pageWidth: PropTypes.number,
    updateMenuItem: PropTypes.func,
};

ScrollArea.defaultProps = {
    speed: 1,
    vertical: true,
    horizontal: true,
    smoothScrolling: false,
    swapWheelAxes: false,
    contentWindow: (typeof window === "object") ? window : undefined,
    ownerDocument: (typeof document === "object") ? document : undefined,
    focusableTabIndex: 1,
};
