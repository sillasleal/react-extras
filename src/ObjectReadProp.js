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

import '@ssl-lib/js-extras';
import React from 'react';

/**
 * Função que injeta as props devidamente validadas
 * @param {object} p Props passadas para o componente
 * @return {Component} Retorna o componente filho com as devidas props
 */
export default (p) => {
  const newProps = Object.keys(p)
      .filter((i) => i !== 'children')
      .reduce((ac, c) => ({
        ...ac,
        [c]: Object.readProp(p[c][0], p[c][1], P[c][2]),
      }), {});
  const {children} = p;
  if (typeof children === 'function') {
    return children(newProps);
  } else {
    const {type: Cpn, props} = children;
    /**/
    return <Cpn {...props} {...newProps} />;
  }
  /**/
};
