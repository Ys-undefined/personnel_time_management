import React from 'react';
import {Row } from 'antd';
import {Course} from "../../../../components/Course/Course.jsx";
import {useState} from 'react'
export const FrontendCourse = () => {
    const[courseList,setData] = useState([
        {courseName:"react课程",
            description:"react课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:2,isOnline:1,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:2,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:0,isOnline:0,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:0,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:1,isOnline:1,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:0,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:1,isOnline:1,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:0,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:1,isOnline:1,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:0,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:1,isOnline:1,createTime:"2023/5/15 20:00:20"},
        {courseName:"js课程",
            description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            toPopulation:0,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
            classification:1,isOnline:1,createTime:"2023/5/15 20:00:20"},
    ]);

    //发送请求参数，测试课程为2
    const [course_classification,setCourse_classification]=useState(2);


    const listItems =courseList.map((course,index)=><Course {...course} key={index}/>);

    return (
        <>
            <Row gutter={[16, 16]} style={{marginLeft:"2%",marginRight:"2%",marginTop:"3%"}}>
                {listItems}
            </Row>
        </>
    )
}