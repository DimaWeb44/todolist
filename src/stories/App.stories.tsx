import React from "react";
import App from "../App";
import {store} from "../state/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'App component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppBaseExample = () => {
    return <Provider store={store}>
        <App/>
    </Provider>
}