"use client"
import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import Navbar from './navbar';
import SideBar from './SideBar';
import Config from './Config'
import WorkSpace from './WorkSpace';
import { store } from './Store/store';
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setMax } from './Store/features/conifg';
import '@fontsource/roboto-mono/100.css'
import '@fontsource/roboto-mono/200.css'
import '@fontsource/roboto-mono/300.css'
import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/roboto-mono/600.css'
import '@fontsource/roboto-mono/700.css'

import '@fontsource/cairo/200.css'
import '@fontsource/cairo/300.css'
import '@fontsource/cairo/400.css'
import '@fontsource/cairo/500.css'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'
import '@fontsource/cairo/800.css'
import '@fontsource/cairo/900.css'
export default function Home() {
  
  
  return (
    <>
    <Provider store={store}>
    <>
    <Navbar/>
    <div className='md:flex md:justify-between md:items-start'>
      <SideBar/>
      <WorkSpace/>
      <Config/>
    </div>
    </>
    </Provider>
    </>
    
  );
}
