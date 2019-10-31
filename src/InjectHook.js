import React, {useContext} from 'react';

/**
 * Componente criado para permitir injetar hooks em
 * classe sem o uso de Consumers
 * @param {Component} Cpm O componente que receberá os hooks
 * @param {object} contexts Dicionário contendo os contexts a
 * serem inseridos no componente
 * @return {Component} O novo componente contendo os hooks
 */
export default (Cpm, contexts) => (props) => (
  <Cpm
    {...props}
    hooks={Object.keys(contexts).reduce((obj, key) => {
      obj[key] = useContext(contexts[key]);
      return obj;
    }, {})}
  />
);
