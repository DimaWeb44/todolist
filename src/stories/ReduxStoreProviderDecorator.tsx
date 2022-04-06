import React from "react";
import {store} from "../state/store";
import {Provider} from "react-redux";


export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={store}>
        {story()}
    </Provider>
}