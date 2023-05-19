import styles from './spareTime.module.scss'
import dayjs from 'dayjs'
import {useEffect, useState} from 'react'
import {Radio, Space, Tag} from 'antd'
import {debounce} from 'lodash'
import {get,post} from '../../../../utils/request.js'

const { CheckableTag } = Tag
function initTimeList(isCurWeek){
    let curDay = isCurWeek?dayjs().day(1):dayjs().day(1).add(1,'week')
    let preTime=dayjs().hour(9).minute(0)
    let curTime=dayjs().hour(10).minute(0)
    const arr= Array(45).fill({}).map((_, index) => {
        let day = {
            id: index + 1,
            date: curDay.format("YYYY-MM-DD"),
            time: `${preTime.format("H:00")}-${curTime.format("H:00")}`,
            idle: preTime.hour() >= 19
        }
        if ((index + 1) % 9 === 0) {
            curDay = curDay.add(1, 'day')
        }
        if (preTime.hour() === 20) {
            preTime = dayjs().hour(9).minute(0)
            curTime = dayjs().hour(10).minute(0)
        } else if (preTime.hour() === 17) {
            preTime = preTime.add(2, 'hour')
            curTime = curTime.add(2, 'hour')
        } else if (preTime.hour() === 11) {
            preTime = preTime.add(3, 'hour')
            curTime = curTime.add(3, 'hour')
        } else {
            preTime = preTime.add(1, 'hour')
            curTime = curTime.add(1, 'hour')
        }
        return day
    })
    const groupedArray= []
    const groupSize = 9
    for (let i = 0 ;i<arr.length;i+=groupSize){
        const group = arr.slice(i,i+groupSize)
        groupedArray.push(group)
    }
    return groupedArray
}
const api ={
    thisWeek:"/api/userdaily/thisWeekIdletime",
    nextWeek:"/api/userdaily/nextWeekIdletime",
    updateIdle:"/api/userdaily/updateIdletime",
}
export const SpareTime = () => {
    const [timeList,setTimeList] =useState(initTimeList(true))
    const getThisWeek = async ()=>{
        const res = await get(api.thisWeek,null)
        if (res){
            setTimeList(res.data)
        }
    }
    const getNextWeek = async ()=>{
        const res = await get(api.nextWeek,null)
        if (res){
            setTimeList(res.data)
        }
    }
    useEffect( ()=>{
        getThisWeek()
    },[])

    const handleChange =async (period,checked)=>{
        const temp=timeList.map(d=>{
            return d.map(p => {
                if (p.id === period.id) {
                    p.idle = checked
                }
                return p
            })
        })
        const res = await post(api.updateIdle,timeList,true)
        if (res){
            setTimeList(temp)
        }
    }
    const day = ()=> timeList.map((d,index)=>{
        return <div key={index} className={styles.day}>
            {
                d.map(period=>{
                    return (
                        <CheckableTag key={period.id}
                                      className={styles.period}
                                      checked={period.idle}
                                      style={{backgroundColor:period.idle?'':'#ebdbc5',fontSize:'15px'}}
                                      onChange={debounce((checked)=>{
                                          handleChange(period,checked)
                                      },300)}
                        >{period.time}</CheckableTag>
                    )
                })
            }
        </div>
    })
    const toChineseNum=(num)=>{
        const chnNumCharList=["一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return chnNumCharList[num-1]
    }
    const changeWeek=(e)=>{
        if (e.target.value===1){
            setTimeList(initTimeList(true))
            getThisWeek()
        }else {
            setTimeList(initTimeList(false))
            getNextWeek()
        }
    }
    return (
        <>
            <div className={styles.whole}>
                <Radio.Group onChange={changeWeek} defaultValue={1}>
                    <Space direction={'horizontal'}>
                        <Radio value={1}>本周</Radio>
                        <Radio value={2}>下周</Radio>
                    </Space>
                    <Space direction={'horizontal'}>
                        <CheckableTag
                                      className={styles.period}
                                      checked={true}
                        >空闲</CheckableTag>
                        <CheckableTag
                            className={styles.period}
                            checked={false}
                            style={{backgroundColor:"#ebdbc5"}}
                        >忙碌</CheckableTag>
                    </Space>
                </Radio.Group>
                <div className={styles.title}>
                    {
                        timeList.map((d,index)=>{
                            return <div className={styles.dayOfWeek} key={index}>
                                <div className={styles.date}>{dayjs(d[0].date).format("YYYY-MM-DD")}</div>
                                <div className={styles.dayNum}>{`周${toChineseNum(dayjs(d[0].date).day())}`}</div>
                            </div>
                        })
                    }
                </div>
                <div className={styles.week}>
                    { day() }
                </div>
            </div>

        </>
    )
}