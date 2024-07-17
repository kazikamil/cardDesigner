"use client"
import Image from 'next/image'
import React,{useState} from 'react'
import Navbar from './navbar';
import SideBar from './SideBar';
import ImgBdd from './ImgBdd';
import WorkSpace from './WorkSpace';
import { store } from './Store/store';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
export default function Home() {
  //
  return (
    <>
    <Provider store={store}>
    <>
    <Navbar/>
    <div className='md:flex md:justify-between md:items-start'>
      <SideBar/>
      <WorkSpace/>
      <ImgBdd/>
    </div>
    </>
    </Provider>
    </>
    
  );
}
