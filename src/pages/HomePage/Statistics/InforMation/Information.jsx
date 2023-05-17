 import { Col, Row, Statistic,Card, Space ,Divider,Descriptions} from 'antd';
 import style from './InforMation.module.scss'
 import {CaretUpOutlined,CaretDownOutlined } from '@ant-design/icons'


export const InforMation = () => {
    const va = ['123'];

    return (
        <>
        
        <div style={{marginTop:'50px',marginLeft:'50px'}}>
            <Card 
            bordered={false}
            className={style.cardStyle}
            hoverable={true}
            >
                   <Row>
                       <Col       
                       span={24}
                       
                       >
                          <Space>
                            <Statistic title="本周投入工时" value={112893} />
                            <p>小时</p>
                          </Space>
                          
                       </Col>
                       <Col 
                       span={12}
                       style={{marginTop: 20}}
                       >
                          <Descriptions colon='false'>
                            <Descriptions.Item label="周同比">
                            <Space>
                               <CaretUpOutlined 
                               style={{color:'#00CD00'}}
                               />
                               <p >{va}</p>
                            </Space>
                            </Descriptions.Item>
                          </Descriptions>
                       </Col>
                       <Col 
                       span={12}
                       style={{marginTop: 20}}
                       >
                        <Descriptions>
                         <Descriptions.Item label="日环比">
                            <Space>
                               < CaretDownOutlined
                               style={{color:'#FF0000'}}
                               />
                               <p >{va}</p>
                            </Space>
                         </Descriptions.Item>
                        </Descriptions>
                       </Col>
                       <Divider 
                          style={{marginBottom:0}}
                       />
                       <Col 
                       span={12}
                       style={{marginTop: 10}}
                       >
                          
                          {/* <Statistic title="2023总投入工时" value={112893}  /> */}
                          <p style={{fontSize:16}}>2023总投入工时</p>
                       </Col>
                   </Row>
            </Card>  
            

            
            <Card id='daima'
            bordered={false}
            className={style.cardStyle}
            hoverable={true}
            >
                   <Row>
                       <Col       
                       span={24}
                       style={{marginTop: 10}}
                       >
                          <Statistic title="总代码量" value={112893}  />
                       </Col>
                       <Col span={12}>
                          <Statistic title="周代码量" value={112893}  />
                       </Col>
                   </Row>
            </Card>  
            
        </div>

            


        </>
        
    )
}