import {Route, Routes, useLocation, useNavigate, useRoutes} from 'react-router-dom'
import router from './router/index.jsx'
import Cookies from 'js-cookie'
import {message} from 'antd'
import {useEffect} from 'react'
import {NotFound} from './pages/NotFound/NotFound.jsx'

function ToLogin(){
    const navigate = useNavigate()
    useEffect(()=>{
        message.error("请先登录!",3).then()
        navigate('/')
    },[])
    return <div></div>
}
function ToHome(){
    const navigate = useNavigate()
    useEffect(()=>{
        message.success("您已经登录!",3).then()
        navigate('/home')
    },[])
    return <div></div>
}
function BeforeRouterEnter(){
    const routeView = useRoutes(router)
    const location = useLocation()
    const token =Cookies.get('token')
    if (location.pathname ==='/' && token){
        return <ToHome></ToHome>
    }else if (location.pathname!=='/' && !token){
        return <ToLogin></ToLogin>
    }else{
        return routeView
    }
}

function App(){
    return (
        <>
            <BeforeRouterEnter/>
            <Routes>
                <Route path={"*"} element={<NotFound/>}></Route>
            </Routes>
        </>
    )
}

export default App