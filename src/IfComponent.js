import {Component, isValidElement} from 'react';
/**/
import ComponentBase from './ComponentBase';

/**
 * Description of IfComponent
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 * @param {Array} args
 */
export class IfComponent extends Component {
  render() {
    const {children, test} = this.props;
    /**/
    if (isValidElement(children)) {
      if (children.props.test && children.type.name === 'If') {
        return children;
      }
    } else if (Array.isArray(children)) {
      for (const item in children) {
        if (children.hasOwnProperty(item)) {
          const element = children[item];
          if (Number(item) !== 0 && element.type.name === 'If') {
            throw new Error('If have to be the first children in IfComponent');
          }
          if ((Number(item) === 0 && element.type.name === 'ElseIf') ||
              (Number(item) === 0 && element.type.name === 'Else')) {
            throw new Error('The first children of IfComponent' +
                ' have to be a If');
          }
          if (element.props.test || element.type.name === 'Else') {
            return element;
          }
        }
      }
    } else {
      return null;
    }
    return null;
  }
};

export class If extends ComponentBase {};

export class ElseIf extends ComponentBase {};

export class Else extends ComponentBase {};
