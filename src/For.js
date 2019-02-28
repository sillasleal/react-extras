import React from 'react';
/**/
import ComponentDefault from './ComponentDefault';

/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
class For extends ComponentDefault {
    static defaultProps = {
        componentProps: () => ({})
    }
    
    render() {
        const {
            children, 
            in: inArray, 
            each, 
            component, 
            componentProps
        } = this.props;
        let newExtraProps;
        /**/
        if(componentProps && typeof componentProps === 'object' && !Array.isArray(componentProps)){
            newExtraProps = () => componentProps;
        } else if (typeof componentProps !== 'function') {
            newExtraProps = () => ({});
        }else {
            newExtraProps = componentProps;
        }
        /**/
        if(typeof component === 'function'){
            return inArray.map((item, key) => this.createCpm(component, {...{...{[each]: item}, ...newExtraProps(item)}}, item, key));
        } else {
            if (typeof children === 'function') {
                return inArray.map(children);
            } else if (typeof children === 'object' && !Array.isArray(children) && children) {
                const Cpm = children.type;
                /**/
                if(each){
                    return inArray.map((item, key) => <Cpm key={key} {...{...children.props, ...{[each]: item}, ...newExtraProps(item)}}/>);
                } else {
                    return inArray.map((item, key) => <Cpm key={key} {...{...children.props, ...newExtraProps(item)}}>{item}</Cpm>);
                }

            } else {
                throw new TypeError("Invalid type of children in For component");
            }
        }
    }
}

export default  For;
