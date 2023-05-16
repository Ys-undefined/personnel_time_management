import ReactDOM from 'react-dom/client'

import 'reset-css'

import './assets/styles/global.scss'

import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </BrowserRouter>
)
