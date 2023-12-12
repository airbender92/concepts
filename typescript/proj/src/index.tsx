import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloClass } from './components/Hello'

ReactDOM.render(
    <HelloClass compiler='Typescript' framework='React' />,
    document.getElementById('example')
)