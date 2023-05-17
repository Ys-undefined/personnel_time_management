import {useEffect, useState} from 'react';
import React from 'react';
import { Avatar, Card } from 'antd';
import { Col, Row } from 'antd';
const { Meta } = Card;
export const Course =(props)=>{
      const {courseName,//课程名称
            description,//描述
            photoUrl,//课程url
            toPopulation,//面向人群(初学者0,熟练者1,资深2)
            logoUrl,//Url
            classification,//课程分类（前端0/后端1/测试2/软件技能3）
            isOnline,//0线下，1线上
            createTime,
        }=props;
      //面向人群显示
       const [viewPopulation,setViewPopulation]=useState("");
      //课程分类显示
      const  [viewClassification,setViewClassification]= useState("")
      //线上线下显示
    const  [viewIsOnline,setViewIsOnline] = useState("")
     useEffect(()=>{
           //适应人群
           const viewPopulation =()=>{ switch (toPopulation){
                case 0:setViewPopulation("初学者");break;
                case 1:setViewPopulation("熟练者");break;
                case 2:setViewPopulation("资深者");break;
                default:break;
             };
           }
           viewPopulation();

            //课程分类显示
         const viewClassification =()=>{switch (classification){
             case 0:setViewClassification("前端");break;
             case 1:setViewClassification("后端");break;
             case 2:setViewClassification("测试");break;
             case 3:setViewClassification("软件技能");break;
             default:break;
         };
             }
             viewClassification();

         //线上线下
         const viewOnline=()=> {
             if (isOnline == 0) setViewIsOnline("线下");
             else setViewIsOnline("线上");
         }
         viewOnline()
     })

      return (
          <Card
              bordered={true}
              style={{ width: 300 ,paddingTop:"10px"}}
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
              <p style={{textAlign:"left",paddingLeft:"48px",fontSize:"10px"}}>{createTime}</p>
              <div style={{paddingTop:"10px"}}>
                  <Row gutter={[16, 16]}>
                      <Col style={{paddingRight:"10px" ,fontSize:"18px"}}>{viewClassification}</Col>
                      <Col style={{paddingRight:"10px",fontSize:"18px"}}>建议{viewPopulation}学习</Col>
                      <Col style={{fontSize:"18px"}}>{viewIsOnline}</Col>
                  </Row>
              </div>
          </Card>
    )

}
