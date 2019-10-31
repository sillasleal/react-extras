/*
 * The MIT License
 *
 * Copyright 2018 Sillas S. Leal<sillas.s.leal@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global Promise */

import '@ssl-lib/js-extras';
import React, {Component, createContext} from 'react';
import PropTypes from 'prop-types';
/**/

const defaultLang = 'pt-BR';
const TranslateContext = createContext({
  language: defaultLang,
});
const {Consumer, Provider} = TranslateContext;

export class TranslateProvider extends Component {
  static propTypes = {
    dictionary: PropTypes.object,
    language: PropTypes.string,
    errorLanguage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dictionary: { },
      language: defaultLang,
      languages: [],
    };
  }

  componentDidMount() {
    this.setLang(this.props.language);
    this.setDictionary(this.props.dictionary);
  }

  /**
   * Método que define o idioma
   * @param {String} language O idioma a ser definido
   * @param {Array} languages Lista de idiomas padrão
   * @return {null}
   */
  setLang(language, languages = []) {
    if (String.isValid(language)) {
      this.setState({
        language,
        languages: Array.isArray(languages) ?
            languages.filter((i) => String.isValid(i)) :
            [],
      });
    } else if (typeof language === 'undefined') {
      // Detect the browser language
      const el = this.props.errorLanguage;
      const browserLang = Object.readProp(window, 'navigator.language', el);
      const browserLangs = Object.readProp(window, 'navigator.languages', []);
      this.setLang(browserLang, browserLangs);
    } else {
      console.error('Invalid language, ' +
          'language need to be a String or undefined:', language);
    }
    /**/
    return null;
  }

  /**
   * Método que define o dicionário
   * @param {object|Promise} dictionary O dicionário ou Promise
   * que entregará o dicionário
   * @param {String} language (Opcional)O idioma do dicionário
   * @return {undefined}
   */
  setDictionary(dictionary, language) {
    if (!Object.isObject(dictionary)) {
      return console.error('Dictionary need to be a object: ', dictionary);
    }
    /**/
    if (dictionary instanceof Promise) {
      dictionary.then((s) => this.setDictionary(s));
    } else {
      if (String.isValid(language)) {
        this.setState((state) => ({
          dictionary: {
            ...state.dictionary,
            [language]: {...dictionary},
          },
        }));
      } else {
        this.setState({
          dictionary: {...dictionary},
        });
      }
    }
  }

  /**
   * Método que concatena um novo dicionário ao dicionary existente
   * @param {object} newDictionary O novo dicionário
   * @return {undefined}
   */
  appendDictionary(newDictionary) {
    if (Object.isObject(newDictionary)) {
      this.setState((state) => ({
        dictionary: Object.assignDeep(state.dictionary, newDictionary),
      }));
    } else {
      console.error('dictionary need to be a object');
    }
    return null;
  }

  /**
   * Método que realiza a tradução da palavra para o idioma selecionado
   * @param {String} key A chave referente a palavra
   * @param {object} params Os parametros a serem inseridos na string ou
   * usados para o plural
   * @param {object} personalDict Um dicionário exclusivo da execução
   * @param {String} personalLang O idioma especifico da execução
   * @param {String} lastNewWord A ultima palavra gerada.
   * Usada para parar a recursão
   * @return {newWord|TranslateProvider@call;translate|
   * TranslateProvider.translate.key|String}
   */
  translate(key, params = {}, personalDict, personalLang, lastNewWord) {
    /*
     *  LÓGICA
     *  SE key é String:
     *      #Verifica se personalLang é válida e usa esse idioma no método
     *      #Verifica se existe um dicionário * e cria um dicionario
     *      local ao método
     *      #Verifica se existe um dicionário * para o idioma usado,
     *      algo como pt-*, o que englobaria 'pt, pt-BR, pt-AN e etc'
     *      e o mescla ao resultado anterior para uso no método
     *      #Verifica se o personalDict é valido, se for, o mescla com o
     *      dicionário global e o local criado anteriormente e usa o resultado
     *      no método
     *      #Verifica se as prorpiedades de params existem no valor associado
     *      a key e substitue na string final
     *      #Verifica se na string final existem chaves internas
     *      #Caso exista chaves internas, tenta substituir essas chaves por
     *      valores no dicionário local ao método
     *  CASE SE key é Array:
     *      #Trata o caso 'plural'
     *      #Verifica se o array possui três elementos
     *      #Verifica se o ultimo elemento é uma propriedade de params
     *      #Verifica se essa propriedade é 1
     *      #Caso seja 1, chama o método novamente passando o primeiro
     *      elemento do array
     *      #Caso contrário, chama o método novamente passando o segundo
     *      elemento do array
     *  CASE CONTRÁRIO:
     *      Exibe um erro
     *      Retorna ''
     */
    if (typeof key === 'string') {
      if (!String.isValid(key)) {
        console.error('key need to be a string!');
        return '';
      }
      // String
      const {
        props: {errorLanguage},
        state: {language, languages, dictionary},
      } = this;
      let newWord;
      let languagesArray = [...languages, errorLanguage];
      const dictionaries = Object.isObject(personalDict) ?
        Object.assignDeep(dictionary, personalDict) :
        {...dictionary};
      const dictAsterisk = Object.readProp(dictionaries, '*', {});
      /* Buscando a palavra nos diversos dicionários */
      if (String.isValid(language)) {
        languagesArray = [language, ...languagesArray];
      }
      if (String.isValid(personalLang)) {
        languagesArray = [personalLang, ...languagesArray];
      }
      languagesArray = [...new Set(languagesArray)];
      let langOfAsterisk;
      let dictAsteriskOfLang;
      let dictOfLang;
      let word;
      for (let i = 0; i < languagesArray.length; i++) {
        if (String.isValid(languagesArray[i])) {
          langOfAsterisk = languagesArray[i].indexOf('-') > -1 ?
            languagesArray[i].split('-')[0] :
            languagesArray[i];
          dictAsteriskOfLang = Object.readProp(
              dictionaries, `${langOfAsterisk}-*`, {});
          dictOfLang = Object.readProp(
              dictionaries, languagesArray[i], {});
          word = dictOfLang[key] ||
              dictAsteriskOfLang[key] ||
              dictAsterisk[key];
          if (word) {
            break;
          }
        }
      }
      if (!word) {
        word = `${key}`;
      }
      /**/
      if (typeof word === 'function') {
        newWord = word(params) || '';
      } else if (typeof word === 'undefined') {
        newWord = key;
      } else {
        newWord = `${word}`;
      }
      /**/
      if (Object.isObject(params) &&
          String.isValid(newWord) &&
          newWord.indexOf('{') > -1) {
        // Tratando os parametros que serão inseridos na nova string
        const keysOnWord = newWord
            .split('}')
            .map((i) => i.substr(i.indexOf('{') + 1))
            .filter((i) => i.length);
        for (const prop in keysOnWord) {
          if (keysOnWord.hasOwnProperty(prop)) {
            const element = keysOnWord[prop];
            newWord = newWord.replaceAll(`{${prop}}`, element);
          }
        }
      }
      /**/
      if (String.isValid(newWord) &&
          newWord.indexOf('{') > -1 &&
          newWord !== lastNewWord) {
        // Apenas entra no if se a string ainda possui "{"
        // e é diferente da anterior
        return this.translate(newWord, {
          ...dictAsterisk,
          ...dictAsteriskOfLang,
          ...dictOfLang,
        }, personalDict, personalLang, newWord);
      } else {
        return newWord;
      }
    } else if (Array.isArray(key)) {
      // Array
      if (key.length < 1) {
        console.error('INVALID_KEY_ARRAY_ON_TRANALSTAE', key);
        console.error('The parameter array "key" need to have 3 elements: ' +
            '0 => "plural key", ' +
            '1 => "singular key", ' +
            '2 => "parameter of count"',
        );
        return '';
      }
      if (key.length < 3 || !Object.isObject(params)) {
        return key[0];
      }
      const keyWord = params[key[2]] === 1 ?
          key[0] :
          key[1];
      /**/
      return this.translate(keyWord, params, personalDict, personalLang);
    } else {
      // Error
      console.error('INVALID_KEY_ON_TRANALSTAE', key);
      console.error('The parameter "key" have to be a String or a Array');
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
      appendDictionary: this.appendDictionary.bind(this),
    };
    /**/
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export const Translate = ({children, params, dictionary, lang}) =>
  typeof children === 'function' ?
      <Consumer>{({translate}) =>
        children((k, o) => translate(k, o, dictionary, lang))
      }</Consumer> :
      <Consumer>{({translate}) => translate(children, params)}</Consumer>;

export const SetLang = ({children}) =>
  typeof children === 'function' ?
      <Consumer>{({setLang}) => children(setLang)}</Consumer> :
      <Consumer>{({setLang}) => setLang(children)}</Consumer>;

export const InjectTranslate = (Cpm, dictionary) =>
  (props) => (
    <Consumer>{({translate}) => (
      <Cpm {...props} translate={(a, b) => translate(a, b, dictionary)}/>
    )}
    </Consumer>
  );

export const AppendDicionary = ({dictionary, children}) => (
  <Consumer>
    {({appendDictionary}) => {
      appendDictionary(dictionary);
      /**/
      return children ? children : null;
    }}
  </Consumer>
);

export {TranslateContext};
