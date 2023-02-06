import play from '../images/play.png';
import pause from '../images/pause.png';
import previous from '../images/previous.png';
import next from '../images/next.png';
import { useEffect, useState } from 'react';
import playpause from '../images/playpause.png';
import {obj} from '../GetID';
import './Results.css';



export default function Results({ Data, prev, setPrev , setDataobj, dataobj}) {

 
  var c = 'a';
  var idx = 0;
  function handle_play(z, e) {

    
    
    // console.log(dataobj);
    
    if (z == prev.id) {

      if (prev.state) {
        document.getElementById(prev.id).pause();
        prev.element.src = play;
        setPrev({ id: z, state: false, element: prev.element })
      }
      else {
        document.getElementById(prev.id).play();
        prev.element.src = pause;
        setPrev({ id: z, state: true, element: prev.element });
      }

    }

    else {
      if (prev.id) {
        document.getElementById(prev.id).pause();
        prev.element && (prev.element.src = play);
      }
      setPrev({ id: z, state: true, element: e });
      document.getElementById(z).play();
      e.src = pause;
    }



  }

  function title_short(x) {
    if (x.length > 30)
      return x.slice(0, 31) + "....";
    else return x;
  }


  function handleSlide(local_id, e){

      var width = e.target.clientWidth;
      console.log(e);
      const offset = e.nativeEvent.offsetX;
      // console.log( (div_progress/100) * document.getElementById(local_id).duration);
      var div_progress = (offset/width) * 100;
      // console.log(div_progress);
      document.getElementById(local_id).currentTime = ( (div_progress/100) * document.getElementById(local_id).duration );
      dataobj.obj[local_id].seek_percent = div_progress;
      setDataobj({...dataobj});

  }



  function onPlay(local_id) {
    // console.log(dataobj.obj[current_audio].seek_percent);

      var duration = document.getElementById(local_id).duration;
      var ct = document.getElementById(local_id).currentTime;

      if(duration == ct){
        prev.element.src = play;
        prev.state = false;
        dataobj.obj[local_id].seek_percent = 0;
        setDataobj((prev)=>({...dataobj}));
        setPrev({...prev});
      }

      else{
      dataobj.obj[local_id].seek_percent = (ct / duration) * 100;
      setDataobj((prev)=>({...dataobj}));
      console.log(dataobj);

      }
    }


    function goto_next(local_id,div){
      if(local_id != 'y'){
         const next_id = String.fromCharCode(local_id.charCodeAt(0) +1);
         const x = document.getElementById(next_id).parentElement.children[2];
         handle_play(next_id,x);
      }
    }


    function goto_prev(local_id, div){
      if(local_id != 'a'){
        const next_id = String.fromCharCode(local_id.charCodeAt(0)-1);
        const x = document.getElementById(next_id).parentElement.children[2];
        handle_play(next_id,x);
      }
    }


  




  return (
    <div className="App">




      {

        Data ? <div className='cards'>

          {
            Data.map((d,i) =>

              <div className='card' key={idx++}>
                <img src={d.album.cover_big} className="card_img" />
                <p className='card_title'> {d && title_short(d.title_short)} </p>
                <div className='seek-bar' onClick={(e)=>handleSlide(String.fromCharCode(c.charCodeAt(0) +i),e)}> <div className='progress' style={{width:`${dataobj.obj[String.fromCharCode(c.charCodeAt(0) +i)].seek_percent}%`}}></div> </div>
                {/* <div> {dataobj.obj[String.fromCharCode(c.charCodeAt(0) +i)].seek_percent}%</div> */}
              <div id={i.toString()} className="buttons">
              <audio src={d && d.preview} id={String.fromCharCode(c.charCodeAt(0) +i)} onTimeUpdate={(e) => onPlay(String.fromCharCode(c.charCodeAt(0) +i))} />
                <img className='pos' src={previous} onClick={() =>goto_prev(String.fromCharCode(c.charCodeAt(0) +i), i.toString())} />
                <img className='butt' src={play} onClick={(e) => handle_play(String.fromCharCode(c.charCodeAt(0) +i), e.target)} />
                <img className='pos' src={next} onClick={() => goto_next(String.fromCharCode(c.charCodeAt(0) +i), i.toString())} />
              </div>
              </div>
            )

          }
        </div> : <div className='d-flex'>NO RESULTS FOUND</div>

      }

    </div>

  );





}