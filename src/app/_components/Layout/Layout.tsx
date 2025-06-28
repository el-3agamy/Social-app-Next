'use client'
import { getUserData } from '@/lib/slices/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Layout({children}:{children : any}) {

    const dispatch = useDispatch<any>()

    useEffect(()=>{
        
        dispatch(getUserData())
    } , [])
  return (
    children
  )
}
