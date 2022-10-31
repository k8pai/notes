import React, { useEffect, useRef, useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDeleteSweep } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';

import Router from 'next/router';


export default function NoteCards(props) {
	const placeContents = useRef();
    const dt = new Date();

    const saveContent = ((index) => {
        const temp = localStorage.getItem('notes');
        const noteTemp = temp? JSON.parse(temp) : [];
        var hours =  dt.getHours>12 ? (dt.getHours%12 == 0? 12: dt.getHours) : dt.getHours;
        var str = dt.getHours>12 ? "PM":"AM";
        noteTemp.map(elem => {
            if(elem.id == index){
                elem.context = placeContents.current.innerHTML;
                elem.createdDate = dt.getDay()+"/"+dt.getMonth()+"/"+dt.getFullYear();
                elem.createdTime = hours+":"+dt.getMinutes+" "+str;
            }
        });
        localStorage.setItem('notes', JSON.stringify(noteTemp));
    })
  return (
    <div>
        <div className='card relative rounded-xl p-6 pt-12 outline-1 shadow-xl min-w-[500px] max-w-[700px] w-full min-h-[300px] h-fit overflow-auto bg-cyan-100'>
            <div className='absolute right-6 top-4 flex space-x-5'>
                <button data-card="workspace" className='text-xl font-semibold' onClick={(e) => {
                    e.preventDefault();
                    placeContents.current.innerHTML = "";
                    placeContents.current.focus();
                }}><span className='flex justify-center items-center transition duration-100 hover:scale-95'><HiOutlinePencilAlt /></span></button>
                {/* <button className='text-xl font-semibold' onClick={(e) => {
                    e.preventDefault();
                    sendDelInfo(props.items.id);
                }}>X</button> */}
                <button className='text-xl font-semibold' onClick={(e) => {
                    e.preventDefault();
                    saveContent(props.items.id);
                }}><IoSaveOutline /></button>
            </div>
            <hr className='' />
            <p ref={placeContents} className='font-semibold tracking-wider text-lg bg-transparent outline-none' contentEditable="true">{props.items.context}</p>
        </div>    
    </div>
  )
}
