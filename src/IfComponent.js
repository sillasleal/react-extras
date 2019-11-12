import {Component, isValidElement} from 'react';
/**/
import ComponentBase from './ComponentBase';

/**
 * Description of IfComponent
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 * @return {Component} Retorna o componente referente ao resultdado do teste
 * @param {Array} args
 */
export const IfComponent = ({children}) => {
  if (isValidElement(children)) {
    if (children.props.test && children.props.name === 'if') {
      return children;
    }
  } else if (Array.isArray(children)) {
    for (const item in children) {
      if (children.hasOwnProperty(item)) {
        const element = children[item];
        if (Number(item) !== 0 && element.props.name === 'if') {
          throw new Error('If have to be the first children in IfComponent');
        }
        if ((Number(item) === 0 && element.props.name === 'elseif') ||
            (Number(item) === 0 && element.props.name === 'else')) {
          throw new Error('The first children of IfComponent' +
              ' have to be a If');
        }
        if (element.props.test || element.props.name === 'else') {
          return element;
        }
      }
    }
  } else {
    return null;
  }
  return null;
};

export class If extends ComponentBase {
    static defaultProps = {
      name: 'if',
    }
};

export class ElseIf extends ComponentBase {
    static defaultProps = {
      name: 'elseif',
    }
};

export class Else extends ComponentBase {
    static defaultProps = {
      name: 'else',
    }
};
