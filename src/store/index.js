import axios from "axios";
import {legacy_createStore as createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {rootReducer} from "./root-reducer";
import * as api from '../config'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'countries'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(
            thunk.withExtraArgument({
                client: axios,
                api,
            })
        )
    )
)

export const persistor = persistStore(store)


// import axios from "axios";
// import {legacy_createStore as createStore, compose, applyMiddleware} from "redux";
// import thunk from "redux-thunk";
//
// import {rootReducer} from "./root-reducer";
// import * as api from '../config'
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//
// export const store = createStore(
//     rootReducer,
//     composeEnhancers(
//         applyMiddleware(
//             thunk.withExtraArgument({
//                 client: axios,
//                 api,
//             })
//         )
//     )
// )