import {useRoutes} from 'react-router-dom'
import router from './router/index.jsx'

function App(){
    const routeView = useRoutes(router)
    return (
        <>
            {routeView}
        </>
    )
}

export default App