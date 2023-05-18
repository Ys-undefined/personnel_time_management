import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'


export const UserInformation =() => {

  return (
    <div>
      <Outlet/>
      <div>
        <NavLink to='user'>修改个人信息</NavLink>
        <NavLink to='/pwd'>修改用户名</NavLink>
      </div>
    </div>


    
  )
}
