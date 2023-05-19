//  import { Col, Row, Statistic,Card, Space ,Divider,Descriptions} from 'antd';
import style from './information.module.scss';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Avatar, List, Button } from 'antd';
import * as echarts from 'echarts';
import React, { createElement, useEffect, useRef } from 'react';
// import DemoArea from '../../../../components/InforMation/Chart.jsx';

export const InforMation = () => {
  const va = [123];
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
      codeLoad: ['365', '600', '540', '400', '300'],
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

  const chartRef = useRef();
  const chartRef1 = useRef();
  const options = {
    // 标题
    title: {
      text: '代码量趋势',
    },
    // 提示框组件

    // 图例组件

    // x轴
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
    },
    // y轴
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data[0].codeLoad,
        // type: 'line' 折线图
        type: 'bar', // 柱状图
      },
    ],
  };

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current);

    // 设置图表实例的配置项和数据
    chart.setOption(options);

    //  // 组件卸载
    //  return () => {
    //    // myChart.dispose() 销毁实例。实例销毁后无法再被使用
    //    chart.dispose();
    //  };
  }, []);
  //document.getElementById('weekup').style.display = '';

  const changeData = () => {
    data2 = data[0].lastRanking;
  };

  return (
    <>
      <div>
        <div style={{ width: '1200px', height: '160px' }}>
          <div className={style.divStyle}>
            <p className={style.title}>本周投入工时</p>
            <div className={style.houreBox}>
              <span className={style.number}>{data[0].workTimeWeek}</span>
              <span className={style.tips}>小时</span>
            </div>
            <div className={style.topdivStyle}>
              <div className={style.content}>
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
              <div className={style.content}>
                <p>日同比</p>
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
              <p>{data[0].workTime}</p>
            </div>
          </div>
          <div className={style.divStyle}>
            <p className={style.title}>代码量</p>
            <div className={style.houreBox}>
              <span className={style.number}>{data[0].workTime}</span>
              <span className={style.tips}>行</span>
            </div>
            <div className={style.topdivStyle} ref={chartRef1}></div>
            <div className={style.bottombox}>
              <p style={{ marginRight: 10 }}>周代码量</p>
              <p>{data[0].codeWeek}</p>
            </div>
          </div>
          <div className={style.divStyle}>
            <p className={style.title}>日报条数</p>
            <p className={style.reportStyle}>{data[0].daysNum}</p>
          </div>
          <div className={style.divStyle}>
            <p className={style.title}>周报条数</p>
            <p className={style.reportStyle}>{data[0].weekNum}</p>
          </div>
        </div>

        <div className={style.chartStyle}>
          <div className={style.titleStyle}>
            <p style={{ marginRight: 800 }}>代码量</p>
            <p style={{ marginRight: 20 }}>本周</p>
            <span className={style.lastweek}> 上周 </span>
          </div>

          <div className={style.barchartStyle} ref={chartRef}></div>

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
