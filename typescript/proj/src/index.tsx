import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { enthusiasm } from './reducers/index'
import { StoreState } from './types/index';

import Hello2 from './containers/Hello2';
import { Provider } from 'react-redux';

const store = createStore<StoreState>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TS'
})

ReactDOM.render(
    <Provider store={store}>
        <Hello2 />
    </Provider>,
    document.getElementById('example') as HTMLElement
)