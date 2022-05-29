import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.css'

function Sidebar() {
    const sidebarOpened = useSelector((state) => state.sidebarOpened)
    const dispatch = useDispatch();
    const toggleSidebar = () => {
        dispatch({ type: 'SIDEBAR' })
    };

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
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className='nav-item'>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Sidebar