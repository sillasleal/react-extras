import React from 'react';
/**/


/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export default ({children, of: inArray, to: each = "children"}) => {
    if (typeof children === 'function') {
        return inArray.map(children);
    } else {
        const Cpm = children.type;
        if (each === 'children') {
            return inArray.map((item, key) => <Cpm key={key}>{item}</Cpm>);
        } else {
            return inArray.map((item, key) => {
                const props = {
                    key,
                    [each]: item
                };
                /**/
                return <Cpm {...props} />;
            });
        }
}
}