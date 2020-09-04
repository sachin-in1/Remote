import React, { Component } from 'react'
import Youtube from 'react-youtube'
class Play extends Component {
    constructor() {
        super();
        this.state={
            i:0,done:false
        }
    }
    componentDidMount() {
        // this.fetchPlaylists();

        // var socket = io();
        // socket.on('i', function(msg){
        //             i=msg;
        //         });
    }
    formatTime(time){
        console.log(time);
        time = Math.round(time);
        var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ":" + seconds;
    }
       
    log(){
        console.log("hi");
        
        // console.log(player.getCurrentTime());
        
    }

    render() {
            const opts = {
              height: '390',
              width: '640',
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                listType: 'playlist',
                // listType: 'user_uploads',
                // list: 'PLf4ff3CDBpnbFFYOiQqhO7kxZLD_8WNig',
                list: 'UUaM-XmpUbe5aXOY9lvp6-Eg',
                index: this.state.i,
                'autohide': 1,
                // i==null?2:i,
                    // list: 'UCAGpAMprjGtyK4N0pSuVbaw',
                    // channel_id:'UCAGpAMprjGtyK4N0pSuVbaw',
                // index:1,
                'controls': 0,
                'enablejsapi': 1,
                'disablekb': 1,
                'modestbranding': 1,
                'rel': 0,
                // 'play':0
                'autoplay': 0
              },
            };
        return(
                <div  class="jumbotron">
                    <br/>
                <Youtube
                // videoId={'E_cTdhd88mk'}                  // defaults -> null
                id='player'                       // defaults -> null
                className='player'                // defaults -> null
                containerClassName='jumbotron'       // defaults -> ''
                opts={opts}                        // defaults -> {}
                // onReady={}                    // defaults -> noop
                // onPlay={}                     // defaults -> noop
                // onPause={func}                    // defaults -> noop
                // onEnd={}                      // defaults -> noop
                // onError={}                    // defaults -> noop
                // onStateChange={}              // defaults -> noop
                // onPlaybackRateChange={}       // defaults -> noop
                // onPlaybackQualityChange={}
                ></Youtube>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-1 glyphicon glyphicon-play-circle"  ></div>
                        <div class="col-sm-1 glyphicon glyphicon-pause" ></div>
                        <div class="col-sm-1 glyphicon glyphicon-stop" ></div>
                        <div class="col-sm-1 glyphicon glyphicon-step-forward"></div>
                        <div class="col-sm-7 " id="custom-seekbar">
                            <span><div id="indiv"><span></span></div></span>
                        </div>
                        <div class="col-sm-1" id="current-time"></div>
                    </div>
                </div>
                    <input id="m" autocomplete="off" /><button>Send</button>
                <ul id="messages"></ul>
                {/* action="/playlists" id="add" method="post" */}

                <div>
                    <input id="listname" type="text" name="list" autocomplete="off" /><br/>
                    <input id="type" type="text" name="listtype" autocomplete="off" />
                    <input type="submit" value="submit"/>
                </div>
                {/* <form action="/playlists" method="get"><input type="search" value="get"></form>
                    
                <form action="/playlists" method="post">?
                    <input type="text" name="listname">
                    <input type="text" name="listtype">
                    <input type="submit" value="Submit">
                </form>  */}
        
            </div>)
    }
    
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
}
export default Play