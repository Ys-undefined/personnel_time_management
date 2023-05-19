
import { Table, } from 'antd';
import {React,setState} from 'react';
// import style from '/LastMonth.module.scss';

export const ClockIn = () => {
  const clock=[{
    
  }];
  let columns;
  columns = [
    {
      title: '打卡日期',
      dataIndex: 'clock_data',
      key: 'clock_data',
      
    },
    {
      title: '打卡时段',
      dataIndex: 'clock_priod',
      key: 'clock_priod',
    },
    {
      title: '有效工时',
      dataIndex: 'work_hour',
      key: 'work_our',
    },
  ];


    return (
        <>
     <div 
    style={{margin:50}}
    >
    <Table 
    columns={columns} 
    dataSource={clock} 
    pagination={false}
    scroll={{
      y: 240,
    }}
    />
    </div>;
        </>
    )
}