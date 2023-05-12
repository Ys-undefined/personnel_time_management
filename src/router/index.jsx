import {Login} from '../pages/Login/Login'
import {Home} from '../pages/HomePage/Home'
import {Schedule} from '../pages/HomePage/Schedule/Schedule'
import {SpareTime} from '../pages/HomePage/Schedule/SpareTime/SpareTime'
import {Record} from '../pages/HomePage/Report/Record'
import {ClockIn} from '../pages/HomePage/Schedule/ClockIn/ClockIn'
import {Navigate} from 'react-router-dom'
import {DailyReport} from '../pages/HomePage/Report/DailyReport/DailyReport'
import {WeeklyReport} from '../pages/HomePage/Report/WeeklyReport/WeeklyReport'


const routes =[
    {
        path:'',
        element:<Login/>
    },
    {
      path: "/home",
      element: <Navigate to="/home/schedule/spare-time"/>
    },
    {
        path: '/home',
        element:<Home/>,
        children:[
            {
                path:"/home/schedule",
                element:<Schedule/>,
                children:[
                    {
                        path:"/home/schedule/spare-time",
                        element:<SpareTime/>
                    },
                    {
                        path: '/home/schedule/clock-in',
                        element: <ClockIn/>
                    }
                ]
            },
            {
                path: "/home/record",
                element:<Record/>,
                children: [
                    {
                        path:'/home/record/daily-report',
                        element: <DailyReport/>
                    },
                    {
                        path:'/home/record/weekly-report',
                        element:<WeeklyReport/>
                    },
                ]
            }
        ]
    }
]

export default routes