import {useNavigate} from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    function login(){
        navigate("/home")
    }
    return (
        <>
            <button onClick={login}>登录</button>
        </>
    )
}

