import ReactDOM from 'react-dom/client'
import 'reset-css'
import './assets/styles/global.scss'

import {BrowserRouter,createBrowserRouter,createHashRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <App/>
    </BrowserRouter>

)
