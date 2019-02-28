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

import React, { Component, Children, createElement } from "react";
/**/
import ComponentDefault from './ComponentDefault';

/**
 * Description of Switch
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
class Switch extends ComponentDefault {
    getChildrens() {
        let children = [];
        let findedDefault = false;
        /**/
        Children.forEach(this.props.children, (item) => {
            if (!findedDefault && item.type.componentName === 'default') {
                //Encontrou um default
                findedDefault = true;
                children.push(this.returnComponent(item));
            }
            if (!findedDefault) {
                //Executa até encontrar um default ou um case break
                if (item.type.componentName === 'case') {
                    if(item.props.value === this.props.value){
                        children.push(this.returnComponent(item, this.props.value));
                        if(item.props.break){
                            findedDefault = true;
                        }
                    }
                }
            }
        });
        /**/
        return children.length ? children : null;
    }

    render() {
        return this.getChildrens();
    }
}

class Case extends Component {
    static componentName = 'case';

    render() {
        return null;
    }
}

class Default extends Component {
    static componentName = 'default';

    render() {
        return null;
    }
}

export default Switch;