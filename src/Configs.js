/* 
 * The MIT License
 *
 * Copyright 2018 Sillas S. Leal<sillas.s.leal@gmail.com>.
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
import '@ssl-lib/js-extras';
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {FetchConsumer} from './Fetch/FetchContext';
import {FirebaseConsumer} from './Firebase/Context';

/**/
const {
    Consumer,
    Provider
} = React.createContext({});

/**
 * Description of Configs
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
export class Configs extends Component {
    render() {
        return (<Consumer>{this.props.children}</Consumer>);
    }
}
;

export class ConfigsSet extends Component {
    static propTypes = {
        configs: PropTypes.object.isRequired
//        configs: PropTypes.object
    }

    static defaultProps = {
        canEdit: true
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.set = this.set.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.configs);
    }

    componentDidMount() {
        const {
            configs
        } = this.props;
        /**/
        this.setState(configs);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    /**
     * Method that set a value of especific config
     * @param {type} name
     * @param {type} value
     * @returns {undefined}
     */
    set(name, value) {
        this.setState(state => ({
                ...state,
                [name]: value
            }));
    }

    setConsumerConfigs(configName, Consumer) {
        if (Object.isObject(this.state[configName])) {
            return <Consumer>{({setConfigs}) => setConfigs(this.state[configName])}</Consumer>;
        } else {
            return null;
        }
    }

    render() {
        const {
            canEdit
        } = this.props;
        let value = {
            configs: this.state
        };
        if (canEdit) {
            value.set = this.set;
        }
        /**/
        return (<Provider value={value}>
            {this.setConsumerConfigs('fetchConfig', FetchConsumer)}
            {this.setConsumerConfigs('firebaseConfig', FirebaseConsumer)}
            {this.props.children}
        </Provider>);
    }
}