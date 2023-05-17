import {Login} from '../pages/Login/Login'
import {Home} from '../pages/HomePage/Home'
import {Schedule} from '../pages/HomePage/Schedule/Schedule'
import {SpareTime} from '../pages/HomePage/Schedule/SpareTime/SpareTime'
import {Report} from '../pages/HomePage/Report/Report.jsx'
import {ClockIn} from '../pages/HomePage/Schedule/ClockIn/ClockIn'
import {UserInformation} from '../pages/HomePage/Schedule/UserInformation/UserInformation'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import {DailyReport} from '../pages/HomePage/Report/DailyReport/DailyReport'
import {WeeklyReport} from '../pages/HomePage/Report/WeeklyReport/WeeklyReport'
//分享课程
import {CourseList} from '../pages/HomePage/CourseList/CourseList.jsx'
import { BackendCourse} from '../pages/HomePage/CourseList/BackendCourse/BackendCourse'
import { FrontendCourse} from '../pages/HomePage/CourseList/FrontendCourse/FrontendCourse'
import { SoftwareSkillCourse} from '../pages/HomePage/CourseList/SoftwareSkillCourse/SoftwareSkillCourse'
import { TestCourse } from '../pages/HomePage/CourseList/TestCourse/TestCourse'
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
                    },
                    {
                        path: '/home/schedule/user-info',
                        element: <UserInformation/>
                    }
                ]
            },
            {
                path: "/home/record",
                element:<Report/>,
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
            },
        ]
    }
]

export default routes