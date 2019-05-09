import React from 'react';
/**/

/**
 * Component ForEach
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export default ({list, children, each = "children"}) => {
    if (typeof list === 'object') {
        if (Array.isArray(list)) {
            if (typeof children === 'function') {
                return list.map(children);
            } else {
                const Cpm = children.type;
                const props = children.props;
                if (each === 'children') {
                    return list.map((item, key) => <Cpm {...props} key={key}>{item}</Cpm>);
                } else {
                    return list.map((item, key) => <Cpm {...props} key={key} {...{[each]: item }} />);
                }
            }
        } else if (list) {
            const keys = Object.keys(list);
            if (typeof children === 'function') {
                return keys.map((index, key) => children(list[index], key));
            } else {
                const Cpm = children.type;
                const props = children.props;
                if (each === 'children') {
                    return keys.map((item, key) => <Cpm {...props} key={key}>{list[item]}</Cpm>);
                } else {
                    return keys.map((item, key) => <Cpm {...props} key={key} {...{[each]: list[item] }} />);
                }
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
};