import { createStore } from 'redux';
import { getCookie } from '../util/cookieUtil'

function initialState() {
    initialState = {sidebarOpened: true}
    if (getCookie('access_token')) {
        initialState.loggedIn = true
    } else {
        initialState.loggedIn = false
    }
    return initialState;
}

const reducerFn = (state = initialState() , action) => {
    switch(action.type) {
        case 'SIDEBAR':
            return {...state, sidebarOpened: !state.sidebarOpened};
        case 'LOGIN':
            return {...state, loggedIn: true}
        case 'LOGOUT':
            return {...state, loggedIn: false}
        default:
            return state;
    }
};

const store = createStore(reducerFn, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;