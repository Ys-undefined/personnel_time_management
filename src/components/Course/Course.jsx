import {useEffect, useState} from 'react';
import React from 'react';
import styles from './Course.module.scss'
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
        <div className={styles.box}>
            <img src={photoUrl}/>
            <div className={styles.box1}>
                <img src={logoUrl} className={styles.logo}/>
                <div className={styles.box2}>
                    <p className={styles.courseName}>{courseName}</p>
                    <p className={styles.describe}>{description}</p>
                   <p className={styles.time}>{createTime}</p>
                </div>
            </div>
            <div className={styles.box3}>
                <p className={styles.common}>{viewClassification}</p>
                <p className={styles.common}>建议{viewPopulation}学习</p>
                <p className={styles.common} >{viewIsOnline}</p>
            </div>
        </div>

    )

}
