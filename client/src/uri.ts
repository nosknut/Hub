import React from 'react';

/**
 * React elements have the property _self defined, whereas in production mode that property is not defined
 */
function isProd() {
    return !('_self' in React.createElement('div'));
}

export const API_URI = isProd() ? String(window.location.origin) : 'http://localhost';
