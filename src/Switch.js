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

import { Component, isValidElement } from "react";
/**/

/**
 * Description of Switch
 * @author Sillas S. Leal<sillas.s.leal@gmail.com>
 */
export class Switch extends Component {
    render() {
        const {children, value} = this.props;
        /**/
        if (isValidElement(children)) {
            if (children.props.value === value || children.props.name === 'default') {
                return children;
            }
        } else if (Array.isArray(children)) {
            let multReturn = [];
            for (var item in children) {
                if (Number(item) !== 0 && children[item].props.name === 'if') {
                    throw new Error("If have to be the first children in IfComponent");
                }
                if (Number(item) === 0 && children[item].props.name === 'default') {
                    throw new Error("The first children of IfComponent have to be a Case");
                }
                if (children[item].props.value === value) {
                    multReturn.push(children[item]);
                    if (children[item].props.break) {
                        break;
                    }
                }
            }
            /**/
            if (!multReturn.length) {
                const lastChild = children[children.length - 1];
                if (lastChild && lastChild.props.name === 'default') {
                    return lastChild;
                } else {
                    return null;
                }
            } else {
                return multReturn;
            }
        } else {
            return null;
        }
        return null;
    }
}

export class Case extends Component {
    static defaultProps = {
        name: 'case'
    }

    render() {
        if (typeof this.props.children === 'function') {
            return this.props.children();
        } else {
            return this.props.children;
        }
    }
}

export class Default extends Component {
    static defaultProps = {
        name: 'default'
    }

    render() {
        if (typeof this.props.children === 'function') {
            return this.props.children();
        } else {
            return this.props.children;
        }
    }
}
