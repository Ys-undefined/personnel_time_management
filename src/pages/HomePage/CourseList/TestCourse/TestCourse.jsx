import React from 'react';
import { Col, Row } from 'antd';
import {Course} from "../../../../components/Course/Course";
import styles from "../courseList.module.scss";
import {useState} from 'react'
export const TestCourse = () => {
      const[courseList,setData] = useState([
          {courseName:"react课程",
              description:"react课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
          {courseName:"js课程",
              description:"js课程描述",photoUrl:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
              toPopulation:1,logoUrl:"https://xsgames.co/randomusers/avatar.php?g=pixel",
              classification:0,isOnline:0},
      ]);
      const listItems =courseList.map((course,index)=><Col span={8} key={index}><Course {...course} key={index}/></Col>);

    return (
        <>
            <Row gutter={[16, 16]} >
                {listItems}
            </Row>
        </>
    )
}