import './Navbar.css';
import { useState,useEffect } from 'react';

 function Navbar({sbar,search,setSbar}){

    const [dark, setdark] = useState();

    const transitionNavbar= ()=> {
        if(window.scrollY > 100){
         setdark(true);
        }
        else{
         setdark(false);
        }
   }
   
   useEffect(() => {
     
       window.addEventListener("scroll",transitionNavbar);
   
       return()=>{
         window.removeEventListener("scroll",transitionNavbar);
       }
     
   }, [])

        return(
            <div className={`Nav ${dark && "sticky"}`}>
                <p>ARUNTHE01</p>
                <input type="text" className='search_bar' placeholder='search for song' value={sbar} onKeyUp={search} onChange={(e) => { setSbar(e.target.value) }} />
            </div>
        )
}

export default Navbar;