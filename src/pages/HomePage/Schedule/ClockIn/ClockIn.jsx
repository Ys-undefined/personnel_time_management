import { Table } from 'antd';
import { React, setState, useState, useEffect } from 'react';
import { get, post } from '../../../../utils/request.js';
// import style from '/LastMonth.module.scss';
const api = {
  infomation: '/api/getClockInfo',
};
export const ClockIn = () => {
  // 请求数据
  const [clock, setclock] = useState([]);
  const clockInfor = async () => {
    const res = await get(api.infomation, null);
    if (res) {
      setclock(res.data);
      console.log(res.data);
    }
  };
  useEffect(() => {
    clockInfor();
  }, []);

  console.log(clock);

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
      <div style={{ margin: 50 }}>
        <Table
          columns={columns}
          dataSource={clock}
          pagination={false}
          scroll={{
            y: 240,
          }}
        />
      </div>
      ;
    </>
  );
};
