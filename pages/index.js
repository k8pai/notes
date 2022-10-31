import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io';
import { GrAdd } from 'react-icons/gr';
import NoteCards from '../components/NoteCards';

export default function Home() {
	const dt = new Date();

	useEffect(() => {
		const localNotes = localStorage.getItem('notes');
		setNoteTemp(localNotes ? JSON.parse(localNotes) : [{id: 0, context: "Your content goes here....", createdDate: `${dt.toDateString()}`, createdTime: `${dt.toLocaleTimeString()}`}]);
	}, [])

	const [noteTemp, setNoteTemp] = useState([]);

	const addNoteTemp = () => {
		const notesFin = [...noteTemp, {
			id: (Math.floor(Math.random()*1000000)+"-"+Math.floor(Math.random()*100000000)+"-"+Math.floor(Math.random()*1000000)),
			context: "Your content goes here....",
			createdDate: `${dt.toDateString()}`, 
			createdTime: `${dt.toLocaleTimeString()}`,
		}];
		localStorage.setItem('notes', JSON.stringify(notesFin));
		setNoteTemp(notesFin);
	}
	
	const deleteNotes = ((index) => {
        const temp = localStorage.getItem('notes');
        const noteTemp = temp? JSON.parse(temp) : [];
		const notes = noteTemp.filter(elem => elem.id != index)
		setNoteTemp(notes);
		localStorage.setItem('notes', JSON.stringify(notes));
	})
	return ( 
		<div className='h-full w-full'>
			<div className='flex'>				
				<div className='h-screen min-w-[175px] w-[175px] bg-gray-700'>
					<ul className='flex flex-col items-center pt-[50px]'>
						<button data-card="workspace" className='rounded-full shadow-md h-[50px] w-[50px] outline-1 outline-black text-xl font-semibold bg-gray-500 my-[10px] flex justify-center items-center'><GrAdd /></button>
						<li data-card="workspace" className='rounded-full shadow-md h-[50px] w-[50px] outline-1 outline-black text-xl font-semibold bg-gray-500'></li>
					</ul>
				</div>
				<div className='flex-1 flex flex-wrap'>
					<div className=''>

					</div>
					<div className='mt-[50px] flex'>
						{noteTemp.map((item) => (
							<div key={item.id} className='w-fit ml-5 mt-12'>
								<div className='relative'>
									<button data-card="workspace" className='text-xl font-semibold absolute bottom-2 right-0 pr-5' onClick={(e) => {
										e.preventDefault();
										deleteNotes(item.id);
									}}><span className='flex justify-center items-center transition duration-100 hover:scale-95'><MdOutlineDeleteSweep /></span></button>
								</div>
								<NoteCards key={item.id} items={item} />
							</div>
						))}
						<div className='m-5 max-w-[75px] w-fit max-h-[450px] h-fit flex flex-col items-center p-3'>
							{/* <button data-card="workspace" className='group rounded-full shadow-md h-[50px] w-[50px] outline-1 outline-black text-xl font-semibold bg-cyan-300 my-[10px]' onClick={saveAllContent}><span className='group-hover:scale-125'><IoSaveOutline /></span></button> */}
							<button data-card="workspace" className='group rounded-full shadow-md h-[50px] w-[50px] outline-1 outline-black text-xl font-semibold bg-cyan-300 my-[10px] flex justify-center items-center' onClick={addNoteTemp}><span className='group-hover:scale-125'><GrAdd /></span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}