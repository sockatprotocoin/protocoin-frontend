import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Blockchain from '../pages/Blockchain';
import Contacts from '../pages/Contacts';
import { useSelector } from 'react-redux';
import './MainContent.css'
import NewTransaction from '../pages/NewTransaction';
import Login from '../pages/Login';
import RegisterForm from '../pages/RegisterForm';

function MainContent() {
    const sidebarOpened = useSelector((state) => state.sidebarOpened)

    return (
        <div className={sidebarOpened ? 'main-content narrow' : 'main-content wide'}>
            <Routes>
                <Route path='/blockchain' element={<Blockchain />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/transaction' element={<NewTransaction />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<RegisterForm/>} />
            </Routes>
        </div>
    )
}

export default MainContent