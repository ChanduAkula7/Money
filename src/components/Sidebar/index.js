import React from 'react'
import {Link,Navigate} from 'react-router-dom'
import './SidebarIndex.css'
import { AiFillHome,AiFillDollarCircle } from 'react-icons/ai';
import {BiSolidUser} from 'react-icons/bi';
import { MdExitToApp } from 'react-icons/md';
import Cookies from 'js-cookie'

const Sidebar = () => {

const logoutbutton=()=>{

  Cookies.remove('jwt_token');
  return <Navigate to="/login" />
}

  return (
    <>
    <div className='extra-container'>
    <nav className="main-container-sidebar">
    <ul className='container11'>
        
            <li className='each-link1'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn94zxLNUsZ4HLud6gaNrgzWv6afVjVb5LjA&usqp=CAU" 
                alt='Logo'
                 className='websitelogo'/>
            </li>
          
          
            <li className='each-link t1'>
                <p><AiFillHome className='sidebar-icon'/></p>
                
                <Link to='/' className='path-Link'>Dashboard</Link>
            </li>
           
           
            <li className='each-link t1'>
            <p><AiFillDollarCircle className='sidebar-icon'/></p>
                
                <Link to='/transactions' className='path-Link'>Transactions</Link>
            </li>
            <li className='each-link t1'>
            <p><BiSolidUser className='sidebar-icon'/>  </p>
                        
                <Link to='/profile' className='path-Link'>Profile</Link>
            </li>
    </ul>
    
               <div className='Log-out'>
               <span><hr className='line'/></span>
               
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn94zxLNUsZ4HLud6gaNrgzWv6afVjVb5LjA&usqp=CAU"
                 alt="user"
                  className='user-pic'/>
                <div className='inside'>
                    <p>name</p>
                    <p>chandu@gmail.com</p>
                </div>
                <li className='each-link2'>
                <Link to='/login' className='path-Link'>
                <MdExitToApp className='sidebar-icon' onClick={logoutbutton}/>
                </Link>
                </li>
                </div>

            


        

    </nav>
    </div>
    </>
  )
}

export default Sidebar;
