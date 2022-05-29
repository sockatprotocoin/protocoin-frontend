import { createStore } from 'redux';

const reducerFn = (state = {sidebarOpened: true} , action) => {
    switch(action.type) {
        case 'SIDEBAR':
            return {sidebarOpened: !state.sidebarOpened};
        default:
            return state;
    }
};

const store = createStore(reducerFn, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;