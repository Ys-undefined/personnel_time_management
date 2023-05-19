import ReactDOM from 'react-dom/client'
import 'reset-css'
import './assets/styles/global.scss'

import {BrowserRouter,createBrowserRouter,createHashRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import App from './App'
// 引入仓库
// import store from './pages/Login/store'
// import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  
        <BrowserRouter>
            <App/>
        </BrowserRouter>
  
   

)
