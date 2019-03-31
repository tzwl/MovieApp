import React from 'react';
import './MovieDetail.css';
import $ from 'jquery';
import { isNull } from 'util';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar.js';
import ModalVideo from '../ModalVideo/ModalVideo.js';
import { MdBookmark, MdStar,MdRemoveCircleOutline } from 'react-icons/md';
import {API_KEY,PATH_MOVIE,PATH_BASE,PATH_COLLECTION,PATH_CREDIT,PATH_IMAGE,PATH_VIDEO,PATH_POSTER} from '../../api/api.js';
import no_profile from '../../images/no-profile-img.png';
import no_img from '../../images/no-image.png';
import { watch } from 'fs';

class MovieDetail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSaved: false,
    };

    this.openModal = this.openModal.bind(this);

    this.getMovieinfo();
    this.getcast();
    this.getbackground();

  }

  getMovieinfo() {

    const movieId = this.props.movieid
    const urlstr = PATH_BASE+PATH_MOVIE+"/" + movieId + "?api_key="+API_KEY+"&language=en-US"

    $.ajax({
      url: urlstr,
      success: (movieResult,status,xhr) => {
        
        const title = movieResult.title;
        const overview = movieResult.overview;
        const cover = PATH_POSTER+"/original" + movieResult.poster_path;
        const year = new Date(movieResult.release_date).getFullYear();

        const time = movieResult.runtime;
        const minutes = time % 60;
        const hours = (time - minutes) / 60;

        const score = movieResult.vote_average;

        if (!isNull(movieResult.belongs_to_collection)) {
          const collectionid = movieResult.belongs_to_collection.id;
          this.getRelatedMovie(collectionid);

        }

        this.setState({
          title: title,
          overview: overview,
          cover: cover,
          year: year,
          time: hours + "h " + minutes + "m",
          score: score * 10,
          num: movieResult,           

        })


      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })


  }
  getRelatedMovie(collectionid) {
    if (!isNull(collectionid)) {
      const urlstr = PATH_BASE+PATH_COLLECTION+"/" + collectionid + "?api_key="+API_KEY+"&language=en-US";

      $.ajax({
        url: urlstr,
        success: (collectionRes) => {

          const results = collectionRes.parts;
          var popularList = []

          results.forEach((movie) => {

            if(!isNull(movie.poster_path)){
              movie.poster_src = PATH_POSTER+"/original" + movie.poster_path;     //for movie image
            }else{
              movie.poster_src = no_img
            }
            
            
            const movielist = <span key={movie.id}><img src={movie.poster_src} alt="img" /><p>{movie.original_title}</p></span>

            popularList.push(movielist)
          })

          this.setState({
            rows: popularList
          })

        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })

    }

  }

  getcast() {
    const movieId = this.props.movieid
    const urlstr = PATH_BASE+PATH_MOVIE+"/" + movieId + PATH_CREDIT+ "?api_key="+API_KEY+""

    $.ajax({
      url: urlstr,
      success: (castresult) => {

        const cast = castresult.cast;
        const crew = castresult.crew;
        const castname = []
        const directors = []
        const writers = []
        const stories = []
        const crewname = []
        

        cast.forEach((value, index) => {
          if (index < 5) {
            let cover= no_profile;
            if(!isNull(value.profile_path)){
              cover = PATH_POSTER+"/original" + value.profile_path;
              
            }

            // console.log(cover);
                        
            const card = <div className='card casts' key={value.id}>
              <img src={cover} alt="cast img" />
              <div className="card-body">

                {value.name}
                <br></br>
                <span style={{ color: '#50E3C2' }}>{value.character}</span>
              </div>
            </div>
            castname.push(card);
          }

        })

        crew.forEach((value) => {
          if (!isNull(value.job)) {
            const job = value.job.toLowerCase();

            // console.log(job);
            if (job === 'director') {
              const director = <div className='col-6' key={value.id}>
                <span className='job'  >{value.job} </span><span className='name' >{value.name}</span>
              </div>

              directors.push(director)
            }
            else if (job === 'writer') {
              const writer = <div className='col-6' key={value.id}>
                <span className='job' >{value.job} </span><span className='name' >{value.name}</span>
              </div>

              writers.push(writer)

            }
            else if (job === 'story') {
              const story = <div className='col-6' key={value.id}>
                <span className='job' >{value.job} </span><span className='name' >{value.name}</span>
              </div>

              stories.push(story)

            }

          }

        })
        crewname.push(directors);
        crewname.push(writers);
        crewname.push(stories);

        this.setState({
          casts: castname,
          crews: crewname
        });

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  getbackground() {

    const movieId = this.props.movieid
    const urlstr = PATH_BASE+PATH_MOVIE+"/" + movieId + PATH_IMAGE + "?api_key="+API_KEY+""

    $.ajax({
      url: urlstr,
      success: (bgresult) => {
        const background = bgresult.backdrops;
        const bglist = []

        background.forEach((value, index) => {
          if (index < 4) {
            const cover = PATH_POSTER+"/original" + value.file_path;
            const bgimg = <div className='bgimg' key={index}><img src={cover} alt="cover img" ></img></div>
            bglist.push(bgimg);

          }
        })

        this.setState({
          bgimgs: bglist
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

  }

  openModal() {
    const movieId = this.props.movieid
    const urlstr = PATH_BASE+PATH_MOVIE+"/" + movieId + PATH_VIDEO+"?api_key="+API_KEY+"&language=en-US"

    $.ajax({
      url: urlstr,
      success: (videores) => {
        const result = videores.results;
        var videokey, videosite;


        result.forEach((value, index) => {
          if (index < 1) {
            videokey = value.key;
            videosite = value.site;

          }
        })
        videosite = videosite.toLowerCase();

        this.setState({
          videokey: videokey,
          videosite: videosite
        })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })

    this.setState({ isOpen: true })

  }

  saveNum = (ev) => {
        // save this number in localStorage
        // get the item from localstorage
        // if exists,   parse it
        //              add current number to array
        //              remove duplicates
        //              update localStorage array
        // if not exists
        //              create a new array with the number
        //              create item in localstorage
        // update state with isSaved
        let nums = localStorage.getItem('watchlist');
        let arr = [];
        let unique =''
        
        if(nums){
            arr = JSON.parse(nums);
            
            arr.push(this.state.num);
            unique = arr
            .map(e => e["id"])
     
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
        
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
            localStorage.setItem('watchlist', JSON.stringify(unique));
        }else{
            arr=[];
            arr.push(this.state.num);
            localStorage.setItem('watchlist', JSON.stringify(arr));
        }
        
        console.log("unique");
        console.log(unique);


        this.setState({isSaved:true});
    }

    removeItem(){
      const watchlist = localStorage.getItem('watchlist');
      const arr = JSON.parse(watchlist);
      const ind = arr
      .map(e => e["id"]).indexOf(this.props.movieid);
      console.log(ind)
      const unique = arr
              .map(e => e["id"])
       
              // store the keys of the unique objects
              .map((e, i, final) => final.indexOf(e) === i && i)
          
              // // eliminate the dead keys & store unique objects
              .filter(
                  function(i) {
                      return i !== ind
                  }
              ).map(e => arr[e]);
  
      // console.log(unique);
      localStorage.setItem('watchlist', JSON.stringify(unique));

      this.setState({
        isSaved:false
      })
      
    }
    
    componentDidMount(){
        // get the array from localstorage
        // parse the array
        // if the number is included in the array
        //update the state for isSaved
        
        const watchlist = localStorage.getItem('watchlist');
        const arr = JSON.parse(watchlist); 
        console.log(watchlist);

        arr.forEach(value=>{
          if(this.props.movieid === value.id){
            this.setState({isSaved: true}); 
          }
        })
        // if(!isNull(watchlist)){
        //   const arr = JSON.parse(watchlist);        
        //   const ind = arr.map(e => e["id"]).indexOf(this.props.movieid);
        //   // console.log(ind);
  
        //   //show remove from watchlist
        //   if(ind>=0){                    
        //     this.setState({isSaved: true});          
            
        //   //show add to watchlist
        //   }else{
        //     this.setState({isSaved: false});
            
        //   }

        // }
        
    }   
  

  render() {
    return (
      <div className='popupbody' >

        <button onClick={this.props.close} className="backbtn">
          <svg height="25" width="25" style={{ marginTop: '0', background: 'none' }}>
            <circle cx="10" cy="10" r="7" stroke="#50E3C2" strokeWidth="2" fill="none" />
            <polyline points="12,13 8,10  12,7" style={{ fill: 'none', stroke: '#50E3C2', strokeWidth: 2 }} />

          </svg>
          Back to the list</button>

        {/* show trailer video */}
        <ModalVideo channel={this.state.videosite} isOpen={this.state.isOpen} videoId={this.state.videokey} onClose={() => this.setState({ isOpen: false })} />

        <div >

          {/* leftside */}
          <div className='col-4'>

            <img src={this.state.cover} id="coverimg" alt='cover img'></img>
            <br></br>

            <div className='row'>
              <p className='icontxt'><MdBookmark style={{ fontSize: '20px', background: '#2B3247' }} />&nbsp;&nbsp;Bookmark</p>
              <p className='icontxt' onClick={this.state.isSaved?this.removeItem.bind(this):this.saveNum.bind(this)}>
                {this.state.isSaved?<MdRemoveCircleOutline style={{ fontSize: '20px', background: '#2B3247' }}/>:<MdStar style={{ fontSize: '20px', background: '#2B3247' }}/>}
                &nbsp;&nbsp;
                {this.state.isSaved?'Remove from Watchlist':'Add Watchlist'}
              </p>
              
            </div>
            <br></br>

            <p className="subtitle">Related Movies</p>
            <div className="row related">
              {this.state.rows}

            </div>
          </div>

          {/* rightside */}
          <div className="divright" >

            <h5 id="title">{this.state.title}</h5>

            <div className="heading">
              <div id="userscore" style={{ width: '10%', display: 'inline-block' }}>
                <CircularProgressBar
                  percentage={this.state.score} />

                <br></br>

                <p>User Score</p>
              </div>
              <div id="play" onClick={this.openModal} >

                <div className="circle">
                  <svg id="triangle">

                  </svg>
                </div>

                <span>Play Trailer</span>
              </div>

              <table id="infotable" >
                <tbody>
                  <tr>
                    <td>
                      Genres
                </td>
                    <td>
                      {this.props.genre}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Release Year
                </td>
                    <td>
                      {this.state.year}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Duration
                </td>
                    <td>
                      {this.state.time}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className='stroke'></hr>

            <p className="subtitle">Overview</p>
            <p style={{
              textAlign: 'justify', color: '#8C93AA', fontSize: '15px',
              lineHeight: '20px'
            }}>{this.state.overview}</p>

            <p className="subtitle">Feature Crew</p>
            <div className="row">
              {this.state.crews}
            </div>

            <hr className='stroke'></hr>

            <p className="subtitle">Top Billed Cast</p>
            <div className="row cast">
              {this.state.casts}
            </div>

            <hr style={{ marginTop: '-1em' }} className='stroke'></hr>

            <p className="subtitle">Backgrounds</p>
            {this.state.bgimgs}


          </div>
          {/* end of rightside */}

        </div>

      </div>


    );
  }
}

export default MovieDetail