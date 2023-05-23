import style from './information.module.scss';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { List } from 'antd';
import * as echarts from 'echarts';
import { useEffect, useState, useRef } from 'react';
import { get } from '../../../../utils/request.js';
const api = {
  infomation: '/api/getStatisticsInformations',
};

export const InforMation = () => {
  const [information, setinformation] = useState([]);

  const inforMation = async () => {
    const res = await get(api.infomation, null);
    if (res) {
      setinformation(res.data);
    }
  };
  useEffect(() => {
    inforMation();
  }, []);

  const options_bar = {
    title: {
      text: '代码量趋势',
      textStyle: {
        fontSize: 16,
        fontweight: 'bolder',
      },
    },

    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
      splitNumber: 5,
      splitLine: {
        show: true,
        interval: 'modSl',
        lineStyle: {
          color: '#ccc',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        data: information.codeLoad,
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
      top: 0,
      bottom: '28%',
      right: 0,
      left: 0,
    },
    // x轴
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      show: false,
      axisTick: {
        show: false,
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
        data: information.codeLoad,
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

  const arearef = useRef();
  const barref = useRef();
  const chart = () => {
    const chart_bar = echarts.init(barref.current);
    chart_bar.setOption(options_bar, true);
    const chart_area = echarts.init(arearef.current);
    chart_area.setOption(options_area, true);
  };

  useEffect(() => {
    chart();
  });
  const thisweek = () => {
    let thisweek = document.getElementById('thisweek');
    thisweek.style.display = 'inline';
    let lastweek = document.getElementById('lastweek');
    lastweek.style.display = 'none';

    let lastweekbox = document.getElementById('lastweekbox');
    let thisweekbox = document.getElementById('thisweekbox');
    thisweekbox.className = style.selectafter;
    lastweekbox.className = style.select;
  };

  const lastweek = () => {
    let thisweek = document.getElementById('thisweek');
    thisweek.style.display = 'none';
    let lastweek = document.getElementById('lastweek');
    lastweek.style.display = 'inline';

    let lastweekbox = document.getElementById('lastweekbox');
    let thisweekbox = document.getElementById('thisweekbox');
    lastweekbox.className = style.selectafter;
    thisweekbox.className = style.select;
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex' }}>
          <div className={style.divStyle}>
            <div className={style.title}>
              <span>本周投入工时</span>
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
                  style={{
                    display: information.weekYoyUp == 1 ? 'inline' : 'none',
                  }}
                />
                <CaretDownOutlined
                  className={style.red}
                  style={{
                    display: information.weekYoyUp == 0 ? 'inline' : 'none',
                  }}
                />
                <p>{information.weekYoy}%</p>
              </div>
              <div className={style.contentright}>
                <p>日环比</p>
                <CaretUpOutlined
                  className={style.green}
                  style={{
                    display: information.dayRatioUp == 1 ? 'inline' : 'none',
                  }}
                />
                <CaretDownOutlined
                  className={style.red}
                  style={{
                    display: information.dayRatioUp == 0 ? 'inline' : 'none',
                  }}
                />
                <p>{information.dayRatio}%</p>
              </div>
            </div>
            <div className={style.bottombox}>
              <p style={{ marginRight: 5 }}>2023年总投入工时</p>
              <p>{information.workTime}</p>
            </div>
          </div>
          <div className={style.divStyle}>
            <div className={style.title}>
              <span>代码量</span>
              <InfoCircleOutlined />
            </div>
            <div className={style.houreBox}>
              <span className={style.number}>{information.codeSum}</span>
              <span className={style.tips}>行</span>
            </div>
            <div className={style.areachart} ref={arearef}></div>

            <div className={style.bottombox}>
              <p style={{ marginRight: 10 }}>周代码量</p>
              <p>{information.codeWeek}</p>
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
            <div className={style.week}>
              <div
                id="thisweekbox"
                onClick={thisweek}
                className={style.selectafter}
              >
                本周
              </div>
              <div id="lastweekbox" onClick={lastweek} className={style.select}>
                上周
              </div>
            </div>
          </div>

          <div className={style.barchartStyle} ref={barref}></div>

          <div className={style.showStyle}>
            <p className={style.listtitle}>代码排行榜</p>

            <div id="thisweek" className={style.listbox}>
              <List
                itemLayout="horizontal"
                dataSource={information.Ranking1}
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
                      <p>{item.userName}</p>
                    </li>
                    <div>{item.sums}</div>
                  </List.Item>
                )}
              />
            </div>
            <div
              id="lastweek"
              className={style.listbox}
              style={{ display: 'none' }}
            >
              <List
                itemLayout="horizontal"
                dataSource={information.Ranking0}
                renderItem={(item, index) => (
                  <List.Item className={style.liststyle}>
                    <div
                      key={index}
                      className={style.listnumber}
                      style={{
                        backgroundColor: index < 3 ? '#000' : '#eeeaea',
                        color: index < 3 ? '#FFF' : '#000',
                      }}
                    >
                      <p style={{ marginRight: 20 }}>{index + 1}</p>
                    </div>
                    <div style={{ width: '100%' }}>{item.userName}</div>

                    <div>{item.sums}</div>
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
