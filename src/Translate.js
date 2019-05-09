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

import "@ssl-lib/js-extras";
import React, {Component, createContext} from "react";
import PropTypes from 'prop-types';
/**/

const defaultLang = 'pt-BR';
const TranslateContext = createContext({
    language: defaultLang
});
const { Consumer, Provider } = TranslateContext;

export class TranslateProvider extends Component {
    static propTypes = {
        dictionary: PropTypes.object,
        language: PropTypes.string,
        errorLanguage: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            dictionary: { },
            language: defaultLang
        };
    }

    componentDidMount() {
        this.setLang(this.props.language, () => this.forceUpdate());
        this.setDictionary(this.props.dictionary);
    }

    /**
     * Método que define o idioma
     * @param {String} language O idioma a ser definido
     * @returns {null}
     */
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

    /**
     * Método que define o dicionário
     * @param {object} dictionary O dicionário
     * @param {String} language (Opcional)O idioma do dicionário
     * @returns {undefined}
     */
    setDictionary(dictionary, language) {
        if (!Object.isObject(dictionary)) {
            return console.error("Dictionary need to be a object: ", dictionary);
        }
        /**/
        if (String.isValid(language)) {
            this.setState(state => ({
                    dictionary: {
                        ...state.dictionary,
                        [language]: { ...dictionary }
                    }
                }));
        } else {
            this.setState({
                dictionary: { ...dictionary }
            });
        }
    }

    /**
     * Método que concatena um novo dicionário ao dicionary existente
     * @param {object} newDictionary O novo dicionário
     * @return {undefined}
     */
    appendDictionary(newDictionary) {
        if (Object.isObject(newDictionary)) {
            this.setState(state => ({
                    dictionary: Object.assignDeep(state.dictionary, newDictionary)
                }));
        } else {
            console.error('dictionary need to be a object');
        }
        return null;
    }

    /**
     * Método que realiza a tradução da palavra para o idioma selecionado
     * @param {String} key A chave referente a palavra
     * @param {object} params Os parametros a serem inseridos na string ou usados para o plural
     * @param {object} personalDict Um dicionário exclusivo da execução
     * @param {String} personalLang O idioma especifico da execução
     * @returns {newWord|TranslateProvider@call;translate|TranslateProvider.translate.key|String}
     */
    translate(key, params = {}, personalDict, personalLang){
        /*
         *  LÓGICA
         *  SE key é String:
         *      #Verifica se personalLang é válida e usa esse idioma no método
         *      #Verifica se existe um dicionário * e cria um dicionario local ao método
         *      #Verifica se existe um dicionário * para o idioma usado, algo como pt-*, o que englobaria 'pt, pt-BR, pt-AN e etc' e o mescla ao resultado anterior para uso no método
         *      #Verifica se o personalDict é valido, se for, o mescla com o dicionário global e o local criado anteriormente e o usa o resultado no método
         *      #Verifica se as prorpiedades de params existem no valor associado a key e substitue na string final
         *  CASE SE key é Array:
         *      #Trata o caso 'plural'
         *      #Verifica se o array possui três elementos
         *      #Verifica se o ultimo elemento é uma propriedade de params
         *      #Verifica se essa propriedade é 1
         *      #Caso seja 1, chama o método novamente passando o primeiro elemento do array
         *      #Caso contrário, chama o método novamente passando o segundo elemento do array
         *  CASE CONTRÁRIO:
         *      Exibe um erro
         *      Retorna ''
         */
        if (typeof key === 'string') {
            if (!String.isValid(key)) {
                return '';
            }
            //String
            let newWord;
            const { props: { errorLanguage }, state: { language } } = this;
//            const {errorLanguage} = this.props;
//            const {language} = this.state;
            const localLang = String.isValid(personalLang) ? personalLang : language;
            const langCoringa = localLang.indexOf('-') > -1 ? localLang.split('-')[0] : localLang;
            const dictionaries = Object.isObject(personalDict) ?
                    Object.assignDeep(this.state.dictionary, personalDict) :
                    { ...this.state.dictionary };
            const dictCoringa = Object.readProp(dictionaries, '*', { });
            const dictCoringaLang = Object.readProp(dictionaries, `${langCoringa}-*`, { });
            const dictionary = Object.readProp(dictionaries, localLang, Object.readProp(dictionaries, errorLanguage, { }));
            const word = dictionary[key] || dictCoringaLang[key] || dictCoringa[key] || key;
            /**/
            if (typeof word === 'function') {
                newWord = word(params, dictionaries, localLang) || '';
            } else if (typeof word === 'undefined') {
                newWord = key;
            } else {
                newWord = `${word}`;
            }
            /**/
            if (Object.isObject(params) && String.isValid(newWord)) {
                for (var prop in params) {
                    newWord = newWord.replaceAll(`{${prop}}`, params[prop]);
                }
            }
            //ESTE TRECHO ESTA COM PROBLEMAS, DEVE SER IMPLEMENTADA UMA CHAMADA RECURSIVA QUE TROQUE TODAS AS CHAVES
//            if (newWord.indexOf("{") > -1) {
//                const wordSplit = newWord.split("{");
//                for (var item in wordSplit) {
//                    const dictKey = wordSplit[item].substr(0, wordSplit[item].indexOf("}"));
//                    if (String.isValid(dictKey) && String.isValid(dictionary[dictKey])) {
//                        newWord = newWord.replaceAll(dictKey, dictionary[dictKey]);
//                    }
//                }
//            }
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
            setLang: this.setLang.bind(this),
            appendDictionary: this.appendDictionary.bind(this)
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

export const AppendDicionary = ({dictionary, children}) => <Consumer>{({appendDictionary}) => {
                    appendDictionary(dictionary);
                    /**/
                    return children ? children : null;
            }}</Consumer>;

export { TranslateContext };