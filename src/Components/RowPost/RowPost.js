import React, { useEffect, useState } from 'react'
import './RowPost.css'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId,setUrlId] = useState('')
  
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setmovies(response.data.results)                                                                      
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,  
    }
    
  };
  const handleMovies=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
     console.log(response)
      if(response.data){ 
        setUrlId(response.data.results[0])
      }
      else{
        console.log("Array empty")
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2> 
        <div className="posters">
            
        {movies.map((obj)=>

            <img onClick={()=>handleMovies(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt=""/>
        )}
               
        </div>
       { urlId &&  <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default RowPost