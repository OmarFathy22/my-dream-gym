import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../public/assets/images/Logo.png'
// import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { EXERCISENAME } from './features/exerciseName';
import Link from 'next/link';
const SearchBox = styled.form`
  /* width: 20%; */
  display: flex;
  flex:1  ;
  margin-top:20px;

`;
const SearchBar = styled.input`
  width: 50px;
  flex: 9;
  border: 1px solid #888;
  border-radius: 2px;
  padding: 5px;
  color: #888;
  &:focus {
    outline: none;
  }
  @media (min-width:200px) and (max-width:500px)  {
    font-size: 13px;
  }
`;
const SearchButton = styled.button`
  border: none;
  background-color: #fe3535;
  color: #e0dede;
  border-radius: 2px;
  flex: 2;
`;


function Header() { 
  const Ref:any = useRef(null);
  const dispatch = useDispatch();
  const [scrollDir , setscrollDir] = useState('down')
  const [pageElement , setpageElement] = useState(0)
  const whenScroll = () => {
    if(document.documentElement.scrollTop >= pageElement || document.documentElement.scrollTop == 0){
      setscrollDir('down')
    }
    else{
      setscrollDir('up')
    }
    setpageElement(document.documentElement.scrollTop)
    console.log("element" , document.documentElement.scrollTop );
  }

  if (typeof window !== "undefined") {
    window.addEventListener('scroll', function() {
      whenScroll()
    });
  }

  
  const handleSearch = (e:any) => {
    e.preventDefault();
      dispatch(EXERCISENAME(Ref?.current?.value));
      Ref.current.value = "";
      window.scrollTo({ top: 1400, behavior: "smooth" });
   }
  const router = useRouter();

  return (
    <header style={{transition:"all 0.5s"}}  className={((scrollDir === "down") ? "top-0 " : "top-[-100px] ") + 'flex items-center fixed top-0 bg-white  right-[5%] left-[5%] !z-[1000] border-b-2 border-b-red-500 rounded-b-2xl h-[80px]'}>
    <div className='flex pl-5 w-[250px] items-center'>
        <Link  href={"/"} className='mr-10 200screen:mr-7' prefetch shallow> 
          <Image className='w-[50px] h-[50px]' height={70} width={70} src={logo} alt='logo' />
        </Link>
        <div className='mt-4'>
          <Link   href={"/"} className={(router.pathname == '/' ? "border-b-2 border-b-red-500 font-bold mr-7" : " font-bold mr-7 text-red") } prefetch shallow>Home</Link>
          <Link   className= {(router.pathname !== '/' ? "!border-b-2 !border-b-red-500 !font-bold" : "!font-bold") } href="/Exercises" prefetch shallow>Exercises</Link>
        </div>
    </div >
    <div className='hidden laptop:flex-[0.2] laptop:block'></div>
    <SearchBox onSubmit={handleSearch}>
        <SearchBar className='200screen:mx-[8px] ml-[50px]' ref={Ref} placeholder="Search Exercises" />
        <SearchButton className='200screen:hidden mr-5' onClick={handleSearch}>Search</SearchButton>
      </SearchBox>

    </header>
  )
}

export default Header