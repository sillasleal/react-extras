import React, {useContext} from 'react';

/**
 * Componente criado para permitir injetar hooks em
 * classe sem o uso de Consumers e de forma simples
 * @param {Component} Cpm O componente que receberá os hooks
 * @param {object} hooks Dicionário contendo os hooks a
 * serem inseridos no componente
 * @return {Component} O novo componente contendo os hooks
 */
export default (Cpm, hooks) => (props) => (
  <Cpm
    {...props}
    hooks={Object.keys(hooks).reduce((obj, key) => {
      obj[key] = useContext(hooks[key]);
      return obj;
    }, {})}
  />
);
