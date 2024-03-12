import React,{useState} from 'react'
import {AiOutlineMenu, AiOutlineHome, AiOutlineProject, AiOutlineMail } from 'react-icons/ai'
import{BsPerson} from 'react-icons/bs'
import {GrProjects} from 'react-icons/gr'
const SideNav = () => {
    const [nav, setNav]=useState(false);
    const handleNav = () =>{
        setNav(!nav);
    };
    return (
        <div>
            <div className='md:block hidden fixed top-[25%] z-10'>
                <div className="flex flex-col">
                    <a href="#main" className='icon' >
                        <AiOutlineHome size={30}/>
                    </a>
                    <a href="#introduction" className='icon' >
                        <BsPerson size={30}/>
                    </a>
                    <a href="#work" className='icon' >
                        <GrProjects size={30}/>
                    </a>
                    <a href="#projects" className='icon' >
                        <AiOutlineProject size={30}/>
                    </a>

                    <a href="#contact" className='icon'>
                        <AiOutlineMail size={30}/>
                    </a>
                </div>
            </div>
        </div>
    )
    
}

export default SideNav