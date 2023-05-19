import React, {useEffect} from 'react';
import {Row } from 'antd';
import {Course} from "../../../../components/Course/Course.jsx";
import {useState} from 'react';

import {get} from "../../../../utils/request.js";
export const TestCourse = () => {
      const[courseList,setCourseList] = useState([]);
      const api ={
        getTestCourse:"/api/course/getCourse",
    };
    const getTestCourse = async ()=>{
        const res = await get(api.getTestCourse,{classification:2})
        if (res){
            setCourseList(res.data)
        }
    };
  useEffect(()=>{
       getTestCourse();
  },[]);

      const listItems =courseList.map((course,index)=><Course {...course} key={index}/>);

    return (
        <>
            <Row gutter={[16, 16]} style={{marginLeft:"2%",marginRight:"2%",marginTop:"3%"}}>
                {listItems}
            </Row>
        </>
    )
}