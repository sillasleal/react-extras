import {Component, isValidElement} from 'react';
/**/
import ComponentBase from './ComponentBase';

/**
 * Description of IfComponent
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export class IfComponent extends Component {
    render() {
        const {children, test} = this.props;
        /**/
        if (isValidElement(children)) {
            if (children.props.test && children.props.name === 'if') {
                return children;
            }
        } else if (Array.isArray(children)) {
            for (var item in children) {
                if (Number(item) !== 0 && children[item].props.name === 'if') {
                    throw new Error("If have to be the first children in IfComponent");
                }
                if (Number(item) === 0 && children[item].props.name === 'elseif') {
                    throw new Error("The first children of IfComponent have to be a If");
                }
                if (children[item].props.test || children[item].props.name === 'else') {
                    return children[item];
                }
            }
        } else {
            return null;
        }
        return null;
    }
}

export class If extends ComponentBase {
    static defaultProps = {
        name: 'if'
    }
}

export class ElseIf extends ComponentBase {
    static defaultProps = {
        name: 'elseif'
    }
}

export class Else extends ComponentBase {
    static defaultProps = {
        name: 'else'
    }
}
