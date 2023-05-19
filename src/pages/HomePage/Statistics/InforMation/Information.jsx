//  import { Col, Row, Statistic,Card, Space ,Divider,Descriptions} from 'antd';
import style from './information.module.scss';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Avatar, List, Button } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';
import { get, post } from '../../../../utils/request.js';
// import DemoArea from '../../../../components/InforMation/Chart.jsx';

const api = {
  infomation: '/api/getStatisticsInformations',
};
export const InforMation = () => {
  // 请求数据
  const [information, setinformation] = useState([]);
  const inforMation = async () => {
    const res = await get(api.infomation, null);
    if (res) {
      setinformation(res.data);
      console.log(res.data);
    }
  };
  useEffect(() => {
    inforMation();
  }, []);
  console.log(information.weekNum);

  const [last, setlast] = useState([]);
  const onClick = () => {
    setlast({
      name: '张三',
      num: 323234,
    });
    console.log('1');
  };

  // 测试数据
  const data = [
    {
      weekYoy: 12,
      dayRatio: 11,
      dayup: 0,
      weekup: 1,
      workTime: 8910,
      workTimeWeek: 132,
      codeSum: 8846,
      codeWeek: 1423,
      daysNum: 12,
      weekNum: 53,
      codeLoad: ['365', '600', '540', '900', '300'],
      Ranking: [
        { name: '张三', num: 323234 },
        { name: '李四', num: 232234 },
        { name: '王五', num: 323234 },
        { name: '王五', num: 323234 },
        { name: '王五', num: 323234 },
        { name: '王五', num: 323234 },
        { name: '王五', num: 323234 },
      ],
      lastRanking: [
        { name: '张', num: 323234 },
        { name: '李', num: 232234 },
        { name: '王', num: 323234 },
        { name: '王', num: 323234 },
        { name: '王', num: 323234 },
        { name: '王', num: 323234 },
        { name: '王', num: 323234 },
      ],
    },
  ];
  const options = {
    title: {
      text: '代码量趋势',
      textStyle: {
        fontSize: 16,
        fontweight: 'bolder',
      },
    },

    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#999', //坐标值得具体的颜色
        },
      },
    },
    // y轴
    yAxis: {
      type: 'value',
      interval: 250,
      splitLine: {
        show: true,
        interval: 'modSl',
        lineStyle: {
          color: '#ccc',
          type: 'dotted',
        },
      },
    },
    series: [
      {
        data: data[0].codeLoad,
        type: 'bar', // 柱状图
        barWidth: 20,
        color: '#25A3F0',
      },
    ],
  };
  const options_area = {
    // 标题
    title: {
      text: '代码量趋势',
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
      backgroundColor: '#999',
      confine: true, // 超出的部分不会被遮盖
    },
    grid: {
      // left: '5%',
      // right: '5%',
      top: 0,
      bottom: '28%',
    },
    // x轴
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
      show: false,
      axisTick: {
        lineStyle: {
          color: '#999',
        },
      },
      axisLabel: {
        color: '#999',
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value, index) {
          if (value !== '') {
            value =
              value.split('-')[0] +
              '/' +
              value.split('-')[1] +
              '/' +
              value.split('-')[2];
          }
          const data = [];
          data.push(index);
          const count = data[data.length - 1];
          if (index === 0 && value !== '') {
            return '             ' + value;
          }
          if (index === count && value !== '') {
            return value + '            ';
          }
        },
      },
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ececec',
        },
      },
      boundaryGap: false,
    },
    // y轴
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data[0].codeLoad,
        // type: 'line' 折线图
        type: 'line',
        lineStyle: {
          color: '#FFFEFF',
        },
        connectNulls: true,
        symbol: 'none',
        areaStyle: {
          color: '#7820BF',
        },
      },
    ],
  };

  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    chart.setOption(options);
  }, []);
  useEffect(() => {
    const chart = echarts.init(document.getElementById('barchart'));
    chart.setOption(options_area);
  }, []);

  return (
    <>
      <div>
        <div style={{ width: '1263px', height: '160px' }}>
          <div className={style.divStyle}>
            <div className={style.title}>
              <span style={{ marginRight: 136 }}>本周投入工时</span>
              <InfoCircleOutlined />
            </div>

            <div className={style.houreBox}>
              <span className={style.number}>{information.workTimeWeek}</span>
              <span className={style.tips}>小时</span>
            </div>
            <div className={style.topdivStyle}>
              <div className={style.contentleft}>
                <p>周同比</p>
                <CaretUpOutlined
                  className={style.green}
                  style={{ display: data[0].weekup == 1 ? 'inline' : 'none' }}
                />
                <CaretDownOutlined
                  className={style.red}
                  style={{ display: data[0].weekup == 0 ? 'inline' : 'none' }}
                />
                <p>20%</p>
              </div>
              <div className={style.contentright}>
                <p>日环比</p>
                <CaretUpOutlined
                  className={style.green}
                  style={{ display: data[0].dayup == 1 ? 'inline' : 'none' }}
                />
                <CaretDownOutlined
                  className={style.red}
                  style={{ display: data[0].dayup == 0 ? 'inline' : 'none' }}
                />
                <p>20%</p>
              </div>
            </div>
            <div className={style.bottombox}>
              <p style={{ marginRight: 5 }}>2023年总投入工时</p>
              <p>{information.workTime}</p>
            </div>
          </div>
          <div className={style.divStyle}>
            <div className={style.title}>
              <span style={{ marginRight: 170 }}>代码量</span>
              <InfoCircleOutlined />
            </div>
            <div className={style.houreBox}>
              <span className={style.number}>{data[0].workTime}</span>
              <span className={style.tips}>行</span>
            </div>
            <div id="barchart" className={style.areachart}></div>
            <div className={style.bottombox}>
              <p style={{ marginRight: 10 }}>周代码量</p>
              <p>{data[0].codeWeek}</p>
            </div>
          </div>
          <div className={style.divStyle}>
            <p className={style.title}>日报条数</p>
            <p className={style.reportStyle}>{information.daysNum}</p>
          </div>
          <div className={style.divStyle}>
            <p className={style.title}>周报条数</p>
            <p className={style.reportStyle}>{information.weekNum}</p>
          </div>
        </div>

        <div className={style.chartStyle}>
          <div className={style.titleStyle}>
            <p style={{ marginRight: 800 }}>代码量</p>
            <p style={{ marginRight: 20 }}>本周</p>
            <p> 上周 </p>
          </div>

          <div id="chart" className={style.barchartStyle}></div>

          <div className={style.showStyle}>
            <p className={style.listtitle}>代码排行榜</p>
            <div className={style.listbox}>
              <List
                itemLayout="horizontal"
                dataSource={data[0].Ranking}
                renderItem={(item, index) => (
                  <List.Item className={style.liststyle}>
                    <li style={{ display: 'flex' }}>
                      <div
                        key={index + 1}
                        className={style.listnumber}
                        style={{
                          backgroundColor: index < 3 ? '#000' : '#eeeaea',
                          color: index < 3 ? '#FFF' : '#000',
                        }}
                      >
                        {index + 1}
                      </div>
                      <p>{item.name}</p>
                    </li>
                    <div>{item.num}</div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
