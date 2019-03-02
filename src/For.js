import {createElement, memo} from 'react';
/**/


const testCache = (prev, next) => JSON.stringify(prev) !== JSON.stringify(next);
/**
 * Component For
 * @description text
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export default memo(({children, of: inArray, to: each="children"}) => inArray.map((item, key) => {
        if (typeof children === 'function') {
            return children(item, key);
        } else {
            return createElement(children.type, {key, [each]: item}, null, each === 'children' ? item : null);
        }
    }), testCache);