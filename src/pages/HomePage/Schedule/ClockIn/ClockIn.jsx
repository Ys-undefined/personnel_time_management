import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { get } from '../../../../utils/request.js';
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
    }
  };
  useEffect(() => {
    clockInfor();
  }, []);

  // 测试数据

  let columns;
  columns = [
    {
      title: '打卡日期',
      dataIndex: 'clock_data',
      key: 'clock_data',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.clock_data - b.clock_data,
    },
    {
      title: '打卡时段',
      dataIndex: 'clock_period',
      key: 'clock_period',
    },
    {
      title: '有效工时',
      dataIndex: 'work_hour',
      key: 'work_our',
    },
  ];

  const onChange = (sorter) => {
    sorter;
  };

  return (
    <>
      <div style={{ margin: 25, backgroundColor: '#FFF' }}>
        <Table
          columns={columns}
          dataSource={clock}
          pagination={false}
          scroll={{
            y: 450,
          }}
          style={{ padding: 16 }}
          onChange={onChange}
        />
      </div>
      ;
    </>
  );
};
