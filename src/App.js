
import './App.css';
import { obj } from './GetID';
import axios from "axios";
import { useEffect, useState } from 'react';
import { options } from './options';
import Results from './components/Results';
import playpause from './images/playpause.png';
import Navbar from './components/Navbar'
import searchimg from './images/search.png'


function App() {

  const [datah,setDatah] = useState(null);
  const [data, setData] = useState(null);
  const [sbar, setSbar] = useState("");
  const [prev, setPrev] = useState({id:null,state:false,element:null});
   var [dataobj, setDataobj] = useState(null);

  


  function get_data(val,setData) {
    axios.request(val).then(function (response) {
       
       setDataobj({obj:{ "a": { "seek_percent": 0 }, "b": { "seek_percent": 0 }, "c": { "seek_percent": 0 }, "d": { "seek_percent": 0 }, "e": { "seek_percent": 0 }, "f": { "seek_percent": 0 }, "g": { "seek_percent": 0 }, "h": { "seek_percent": 0 }, "i": { "seek_percent": 0 }, "j": { "seek_percent": 0 }, "k": { "seek_percent": 0 }, "l": { "seek_percent": 0 }, "m": { "seek_percent": 0 }, "n": { "seek_percent": 0 }, "o": { "seek_percent": 0 }, "p": { "seek_percent": 0 }, "q": { "seek_percent": 0 }, "r": { "seek_percent": 0 }, "s": { "seek_percent": 0 }, "t": { "seek_percent": 0 }, "u": { "seek_percent": 0 }, "v": { "seek_percent": 0 }, "w": { "seek_percent": 0 }, "x": { "seek_percent": 0 }, "y": { "seek_percent": 0 } }});
      console.log(response.data.data);
      setData(response.data.data);
      setPrev({id:null,state:false});
    }).catch(function (error) {
      console.error(error);
      
    });
  }

  const x = useEffect(()=>{
        get_data(options,setDatah);
  },[])

  function search(e) {
    if (e.key === "Enter") {
      options.params.q = sbar.trim();
      get_data(options,setData);
      setSbar("");
    }
  }

  function title_short(x){
    if(x.length > 30)
      return x.slice(0,31)+"....";
    else return x;
  }

  return (
    <div className="App">

      <Navbar sbar={sbar} search={search} setSbar={setSbar}/>
      {/* <input type="text" className='search_bar' placeholder='search for song' value={sbar} onKeyUp={search} onChange={(e) => { setSbar(e.target.value) }} /> */}
        {
          data?<div > <div className='header-search'> <h1 className='header'> RESULTS FOUND ON</h1> <img src= {searchimg}/> </div> <div/> <Results Data={data} prev={prev} setPrev={setPrev} setDataobj={setDataobj} dataobj={dataobj}/> </div>:<div ><h1 className='header'> BLOCK BUSTERS </h1><Results Data={datah} prev={prev} setPrev={setPrev} setDataobj={setDataobj} dataobj={dataobj}/> </div>
        }
    </div>

  );
}

export default App;
