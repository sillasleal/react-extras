import React, { Component } from 'react';

/**
 * Description of ComponentDefault
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
class ComponentDefault extends Component {
    /**
     * Método que cria um novo component baseado nos dados passados
     * @param {object} component
     * @param {object|function} componentProps 
     * @param {mixed} componentPropsParams 
     * @param {number} key 
     * @returns {Component} Retorna um novo componente React
     */
    createCpm(component, componentProps, componentPropsParams, key) {
        if (typeof component !== 'function') {
            throw new TypeError("Invalid component");
        }
        /**/
        let
                Cpm = component,
                newProps;
        /**/
        if (componentProps && typeof componentProps === 'object' && !Array.isArray(componentProps)) {
            newProps = componentProps;
        } else if (typeof componentProps === 'function') {
            newProps = componentProps(componentPropsParams);
        } else {
            newProps = {};
        }
        /**/
        if (typeof key === 'number') {
            return <Cpm key={key} {...newProps}/>;
        } else {
            return <Cpm {...newProps}/>;
        }
    }

    /**
     * Método que testa e retorna um novo componente de acordo com as props do item informado
     * @param {Component} item O elemento a ter seus filhos testados
     * @param {object} parameters Os parametros para o novo elemento
     * @returns {Component}
     */
    returnComponent(item, parameters) {
        let children = null;
        /**/
        if (item.props.component) {
            children = this.createCpm(item.props.component, item.props.componentProps);
        } else {
            if (typeof item.props.children === 'function') {
                children = item.props.children(parameters || item.props.componentProps);
            } else {
                children = item.props.children;
            }
        }
        /**/
        return children;
    }
}

export default ComponentDefault;
