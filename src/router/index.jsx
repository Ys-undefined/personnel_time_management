import {Login} from '../pages/Login/Login'
import {Home} from '../pages/HomePage/Home'
import {Schedule} from '../pages/HomePage/Schedule/Schedule'
import {SpareTime} from '../pages/HomePage/Schedule/SpareTime/SpareTime'
import {Report} from '../pages/HomePage/Report/Report.jsx'
import {ClockIn} from '../pages/HomePage/Schedule/ClockIn/ClockIn'
import {Navigate} from 'react-router-dom'
import {DailyReport} from '../pages/HomePage/Report/DailyReport/DailyReport'
import {WeeklyReport} from '../pages/HomePage/Report/WeeklyReport/WeeklyReport'
import { InforMation } from '../pages/HomePage/Statistics/InforMation/Information'


//分享课程
import {CourseList} from '../pages/HomePage/CourseList/CourseList.jsx'
import { BackendCourse} from '../pages/HomePage/CourseList/BackendCourse/BackendCourse'
import { FrontendCourse} from '../pages/HomePage/CourseList/FrontendCourse/FrontendCourse'
import { SoftwareSkillCourse} from '../pages/HomePage/CourseList/SoftwareSkillCourse/SoftwareSkillCourse'
import { TestCourse } from '../pages/HomePage/CourseList/TestCourse/TestCourse'
import {ModifyUser} from '../pages/HomePage/Schedule/UserInformation/ModifyUser'
import {ModifyPwd} from '../pages/HomePage/Schedule/UserInformation/ModifyPwd'
import {MyCourse} from "../pages/HomePage/Schedule/MyCourse/MyCourse";


const routes =[
    {
        path:'',
        element:<Login/>,
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
                        path:"/home/schedule/my-course",
                        element:<MyCourse/>
                    },
                    {
                        path: '/home/schedule/clock-in',
                        element: <ClockIn/>
                    },
                    {   
                        //这里直接加载子组件
                        children:[
                            {
                                path:'/home/schedule/user-info',
                                element: <ModifyUser/>
                            },
                            {
                                path:'/home/schedule/user-info/pwd',
                                element: <ModifyPwd/>
                            }
                           


                        ]
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
            {
                path: "/home/information",
                element:<InforMation/>
            },
            {
                path: "/home/course-list",
                element: <CourseList/>,
                children:[
                    {
                        path:'/home/course-list/frontend-course',
                        element: <FrontendCourse/>
                    },
                    {
                        path:'/home/course-list/backend-course',
                        element: <BackendCourse/>
                    },
                    {
                        path:'/home/course-list/software-skill-course',
                        element:<SoftwareSkillCourse/>
                    },
                    {
                        path:'/home/course-list/test-course',
                        element:<TestCourse/>
                    }

                ]
            },
        ]
    },

]

export default routes