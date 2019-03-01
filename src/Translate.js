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

import React, {Component, createContext} from "react";
import PropTypes from 'prop-types';
/**/

const defaultLang = 'pt-BR';
const {Consumer, Provider} = createContext({
    language: defaultLang
});

export class TranslateProvider extends Component {
    static propTypes = {
        dictionary: PropTypes.object,
        language: PropTypes.string
    };
    
    constructor(props) {
        super(props);
        this.state = {
            dictionary: {},
            language: defaultLang
        };
    }

    componentDidMount() {
        this.setLang(this.props.language, () => this.forceUpdate());
        this.setDictionary(this.props.dictionary);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.language !== nextState.language;
    }

    setLang(language) {
        if (String.isValid(language)) {
            this.setState({
                language
            });
        } else if (typeof language === 'undefined') {
            //Detect the browser language
            this.setLang(Object.readProp(window, 'navigator.language', 'pt-BR'));
        } else {
            console.error('Invalid language, language need to be a String or undefined:', language);
        }
        /**/
        return null;
    }

    setDictionary(dictionary, language) {
        if (!Object.isObject(dictionary)) {
            return console.error("Dictionary need to be a object: ", dictionary);
        }
        /**/
        if (String.isValid(language)) {
            this.setState(state => ({
                    dictionary: {
                        ...state.dictionary,
                        [language]: {...dictionary}
                    }
                }));
        } else {
            this.setState({
                dictionary: {...dictionary}
            });
        }
    }

    translate(key, params = {}, personalDict, personalLang){
        if (String.isValid(key)) {
            //String
            let newWord;
            const language = String.isValid(personalLang) ?
                    personalLang :
                    this.state.language;
            const dictionaries = Object.isObject(personalDict) ?
                    Object.assignDeep(this.state.dictionary, personalDict) :
                    {...this.state.dictionary};
            const dictionary = Object.isObject(dictionaries[language]) ?
                    dictionaries[language] :
                    {};
            const word = dictionary[key];
            if (typeof word === 'function') {
                newWord = word(language, dictionaries);
            } else {
                newWord = `${word}`;
            }
            /**/
            if (Object.isObject(params)) {
                for (var prop in params) {
                    newWord = newWord.replaceAll(`{${prop}}`, params[prop]);
                }
            }
            if (newWord.indexOf("{") > -1) {
                const wordSplit = newWord.split("{");
                for (var item in wordSplit) {
                    const dictKey = wordSplit[item].substr(0, wordSplit[item].indexOf("}"));
                    if (String.isValid(dictKey) && String.isValid(dictionary[dictKey])) {
                        newWord = newWord.replaceAll(dictKey, dictionary[dictKey]);
                    }
                }
            }
            /**/
            return newWord;
        } else if (Array.isArray(key)) {
            //Array
            if (key.length < 1) {
                console.error("INVALID_KEY_ARRAY_ON_TRANALSTAE", key);
                console.error("The parameter array 'key' have need to have 3 elements: 0 => 'plural key', '1' => 'singular key', 2 => 'parameter of count'");
                return '';
            }
            if (key.length < 3 || !Object.isObject(params)) {
                return key[0];
            }
            const keyWord = params[key[2]] === 1 ? key[0] : key[1];
            /**/
            return this.translate(keyWord, params, personalDict, personalLang);
        } else {
            //Error
            console.error("INVALID_KEY_ON_TRANALSTAE", key);
            console.error("The parameter 'key' have to be a String or a Array");
        }
        /**/
        return '';
    }

    render() {
        const value = {
            language: this.state.language,
            dictionary: this.state.dictionary,
            translate: this.translate.bind(this),
            setLang: this.setLang.bind(this)
        };
        /**/
        return <Provider value={value}>{this.props.children}</Provider>;
    }
}

export const Translate = ({children, params, dictionary, lang}) => typeof children === 'function' ?
            <Consumer>{({translate}) => children((k, o) => translate(k, o, dictionary, lang))}</Consumer> :
            <Consumer>{({translate}) => translate(children, params)}</Consumer>;

export const SetLang = ({children}) => typeof children === 'function' ?
            <Consumer>{({setLang}) => children(setLang)}</Consumer> :
            <Consumer>{({setLang}) => setLang(children)}</Consumer>;
