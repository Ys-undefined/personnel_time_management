import {useEffect, useState} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Col, Row } from 'antd';
const { Meta } = Card;
export const Course =(props)=>{
      //课程名称，描述，课程url，面向人群(初学者0,熟练者1,资深2),Url,课程分类（前端0/后端1/测试2/软技能3）,线上线下
      const {courseName,description,photoUrl,toPopulation,logoUrl,classification,isOnline} =props;

      return (
          <Card
              bordered={true}
              style={{ width: 300 }}
              cover={
                  <img
                      alt="example"
                      src={photoUrl}
                  />
              }
              >
              <Meta style={{textAlign:'left'}}
                    //头像
                  avatar={<Avatar src={logoUrl} />}
                  title={courseName}
                  description={description}

              />
              <p style={{textAlign:"left",paddingLeft:"48px",fontSize:"10px"}}>课程时间</p>
              <div style={{backgroundColor:'#eee'}}>
                  <Row gutter={[16, 16]}>
                      <Col style={{paddingRight:"10px" ,fontSize:"18px"}}>前端</Col>
                      <Col style={{paddingRight:"10px",fontSize:"18px"}}>建议初学者学习</Col>
                      <Col style={{fontSize:"18px"}}>线下</Col>
                  </Row>
              </div>
          </Card>
    )

}
