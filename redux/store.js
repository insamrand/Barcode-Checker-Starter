
import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';

import createRootReducer from "./reducers/root.reducer";

export default function configureStore() {
    const store = createStore(
        createRootReducer(),
        compose(
            applyMiddleware(
                // logger
            ),
        ),
    );

    return store;
} 