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

import React, {Component} from "react";
import PropTypes from 'prop-types';
/**/
import { Configs } from './Configs';

const {
    Consumer,
    Provider
} = React.createContext({});

class TranslateDict extends Component {
    static propTypes = {
        dict: PropTypes.object,
        children: PropTypes.node.isRequired
    }
    
    static defaultProps = {
        dict: {}
    }
    
    render() {
        const {
            dict,
            children
        } = this.props;
        /**/
        return (<Provider value={dict}>{children}</Provider>);
    }
}

/**
 * Description of Translate
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
class Translate extends Component {
    static propTypes = {
        dict: PropTypes.object,
        children: PropTypes.string.isRequired,
        plural: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    }
    
//    static defaultProps = {
//        plural: {}
//    }
    
    constructor(props) {
        super(props);
        this.translate = this.translate.bind(this);
    }

    translate(lang, dict, key, plural) {
        const dictionary = dict[lang] || {};
        /**/
        return dictionary[key] || key;
    }

    render() {
        const {
            dict: dictionary,
            children,
            plural
        } = this.props;
        /**/
        return <Configs>{
            ({lang}) => <Consumer>{
                    (dict) => {
                        if (Object.isObject(dictionary)) {
                            return this.translate(lang, dictionary, children, plural);
                        } else {
                            return this.translate(lang, dict, children, plural);
                        }
                    }
                }</Consumer>
        }</Configs>;
    }
}

export {TranslateDict, Translate};