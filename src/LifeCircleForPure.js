/* 
 * The MIT License
 *
 * Copyright 2019 Sillas S. Leal<sillas.santos.leal@accenture.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';

/**
 * Description of LifeCircleForPure
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export default class LifeCircleForPure extends Component {
    static propTypes = {
        componentDidMount: PropTypes.func,
        componentDidUpdate: PropTypes.func,
        componentWillUnmount: PropTypes.func,
        shouldComponentUpdate: PropTypes.func,
        getSnapshotBeforeUpdate: PropTypes.func,
        componentDidCatch: PropTypes.func,
        componentWillMount: PropTypes.func,
        componentWillReceiveProps: PropTypes.func,
        componentWillUpdate: PropTypes.func,
        constructor: PropTypes.func,
    }

    static defaultProps = {
        componentDidMount: () => ({}),
        componentDidUpdate: () => ({}),
        componentWillUnmount: () => ({}),
        shouldComponentUpdate: () => true,
        getSnapshotBeforeUpdate: () => ({}),
        componentDidCatch: () => ({}),
        componentWillMount: () => ({}),
        componentWillReceiveProps: () => ({}),
        componentWillUpdate: () => ({}),
        constructor: () => ({}),
    }
    
    constructor(props) {
        super(props);
        if(typeof props.constructor === 'function'){
            props.constructor(props);
        }
    }

    componentDidMount() {
        this.props.componentDidMount();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.componentDidUpdate(prevProps, prevState, snapshot);
    }
    
    componentWillUnmount() {
        this.props.componentWillUnmount();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.shouldComponentUpdate(nextProps, nextState);
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        this.props.getSnapshotBeforeUpdate(prevProps, prevState);
    }
    
    componentDidCatch(error, info) {
        this.props.componentDidCatch(error, info);
    }
    
    UNSAFE_componentWillMount(){
        this.props.componentWillMount();
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        this.props.componentWillReceiveProps(nextProps);
    }
    
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        this.props.componentWillUpdate(nextProps, nextState);
    }

    render() {
        if (typeof this.props.children === 'function') {
            return this.props.children({
                setState: this.setState.bind(this)
            });
        } else {
            return this.props.children;
        }

    }
};