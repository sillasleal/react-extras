import React, {Component, Children, createElement} from 'react';
/**/
import ComponentDefault from './ComponentDefault';

/**
 * Description of IfComponent
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
class IfComponent extends ComponentDefault {
    getChildrens() {
        let
                children = null,
                ifCpm = 0,
                elseCpm;
        /**/
        Children.forEach(this.props.children, (item) => {
            if (elseCpm) {
                //Caso um else tenha sido encontrado, todo o restante é igorado
                return;
            }
            /**/
            if (!ifCpm && item.type.componentName !== 'if') {
                throw new Error("O primeiro teste deve ser obrigatoriamente um IF");
            }
            if (ifCpm > 1 && item.type.componentName === 'if') {
                throw new Error("Defina apenas um IF por IfComponent");
            }
            if (item.type.componentName === 'else') {
                if (elseCpm) {
                    throw new Error("Defina apenas um ELSE por IfComponent");
                } else {
                    elseCpm = item;
                }
            }
            if (item.props.test && !children) {
                children = this.returnComponent(item);
            }
            ifCpm++;
        });
        if (!children && elseCpm) {
            children = this.returnComponent(elseCpm);
        }
        /**/
        return children;
    }

    render() {
        const children = this.getChildrens();
        /**/
        return children;
    }
}

class If extends Component {
    static componentName = 'if';

    render() {
        return null;
    }
}

class ElseIf extends If {
    static componentName = 'elseif';
}

class Else extends If {
    static componentName = 'else';
}

export {IfComponent};
export {If};
export {ElseIf};
export {Else};
