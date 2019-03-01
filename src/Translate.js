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

/**
 * Configs of component
 * @type object
 */
let _dictionary = {
    language: 'pt-BR',
    dictionaries: {}
};

/**
 * Method that set the default language
 * @param {String} language The new language. The browser value will be used if the value is undefined
 * @param {function} callback Function that run after change language
 * @returns {undefined}
 */
export const setLang = (language, callback) => {
    if (String.isValid(language)) {
        //Set new language
        _dictionary.language = language;
        /**/
        if (typeof callback === 'function') {
            callback(language);
        }
    } else {
        //Detect the browser language
        const newLanguage = Object.readProp(window, 'navigator.language');
        setLang(newLanguage, callback);
    }
};

/**
 * Function that replace a key for a word
 * @param {String|Array} key
 * @param {object} params
 * @param {object} personalDict 
 * @returns {undefined}
 */
export const t = (key, params = {}, personalDict = {}, personalLang = '') => {
    if (String.isValid(key)) {
        //String
        const language = String.isValid(personalLang) ?
                personalLang :
                _dictionary.language;
        const dictionaries = Object.isObject(personalDict) ?
                Object.assignDeep(_dictionary.dictionaries, personalDict) :
                {..._dictionary.dictionaries};
        const dictionary = Object.isObject(dictionaries[language]) ?
                dictionaries[language] :
                {};
        const word = dictionary[key];
        let newWord = String.isValid(word) ? `${word}` : key;
        /**/
        if (Object.isObject(params)) {
            for (var prop in params) {
                newWord.replaceAll(`{${prop}}`, params[prop]);
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
        const keyWord = params[key[2]] === 1 ? key[1] : key[0];
        /**/
        return t(keyWord, params, personalDict, personalLang);
    } else {
        //Error
        console.error("INVALID_KEY_ON_TRANALSTAE", key);
        console.error("The parameter 'key' have to be a String or a Array");
        /**/
        return '';
}

};

export class TranslateProvider extends Component {
    componentDidMount() {
        setLang(this.props.language, this.forceUpdate());
        this.setDictionary(this.dictionary);
    }

    setDictionary(dictionary) {
        if (Object.isObject(dictionary)) {
            _dictionary.dictionaries = {...dictionary};
        }
    }

    render() {
        return this.props.children;
    }
};

export class Translate extends Component {
    render() {
        if (typeof children === 'function') {
            const {children, params, dictionary, lang} = this.props;
            const translate = (key, others) => t(key, others, dictionary, lang);
            /**/
            return children(translate, `${_dictionary.language}`);
        } else {
            return t(this.props.children, this.prop.params);
        }
    }
};