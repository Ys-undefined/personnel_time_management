import React, {useEffect} from 'react';
import {Row } from 'antd';
import {Course} from "../../../../components/Course/Course.jsx";
import {useState} from 'react'
import {get} from "../../../../utils/request.js";
export const MyCourse = () => {
    const[courseList,setCourseList] = useState([

    ]);

    //发送请求参数，测试课程为2
    const api ={
        getMyCourse:"/api/course/getCourseById",
    };
    const getMyCourse = async ()=>{
        const res = await get(api.getMyCourse,"")
        if (res){
            setCourseList(res.data)
        }
    };
    useEffect(()=>{
        getMyCourse();
    },[]);
    const listItems =courseList.map((course,index)=><Course {...course} key={index}/>);
    return (
        <>
            <Row gutter={[16, 16]} style={{display:'flex',marginLeft:"2%",marginTop:'2.2%',overflow:'scroll',height:'93vh'}}>
                {listItems}
            </Row>
        </>
    )
}