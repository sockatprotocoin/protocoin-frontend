import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.css'
import { setCookie } from '../util/cookieUtil';

function Sidebar() {
    const sidebarOpened = useSelector((state) => state.sidebarOpened)
    const loggedIn = useSelector((state) => state.loggedIn)
    const dispatch = useDispatch();
    const toggleSidebar = () => {
        dispatch({ type: 'SIDEBAR' })
    };

    const logout = () => {
        setCookie('access_token', '')
        setCookie('refresh_token', '')
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <>
            <div className='header'>
                <svg viewBox="0 0 100 80" width="40" height="25" onClick={toggleSidebar}>
                    <rect width="100" height="12" rx="8"></rect>
                    <rect y="30" width="100" height="12" rx="8"></rect>
                    <rect y="60" width="100" height="12" rx="8"></rect>
                </svg>
                <span className='app-name'>PROTOCOIN</span>
            </div>
            <div className={sidebarOpened ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {loggedIn ? "" : 
                        <li key="login" className='nav-item'>
                            <Link to="/login"><span>Login</span></Link>
                        </li> 
                    }
                    {SidebarData.map((item, index) => {
                        if (item.access === 'loggedIn' && !loggedIn) {
                            return
                        }
                        return (
                            <li key={index} className='nav-item'>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    {loggedIn ?
                        <li key="login" className='nav-item' onClick={logout}>
                            <Link to="/login"><span>Log out</span></Link>
                        </li> : ""
                    }
                </ul>
            </div>
        </>
    )
}

export default Sidebar