import React, { Component } from 'react'
// import TablePlaylist from './TablePlaylist/TablePlaylist'
import axios from 'axios'
// import { Container } from 'semantic-ui-react';
// import ModalPlaylist from './ModalPlaylist/ModalPlaylist'
class Home extends Component {
    constructor() {
        super();
        this.state={
            playlists:[]
        }
        this.fetchPlaylists = this.fetchPlaylists.bind(this);
        this.handlePlaylistAdded = this.handlePlaylistAdded.bind(this);
    }
    componentDidMount() {
        this.fetchPlaylists();
    }
    fetchPlaylists() {
        axios.get('/playlists/')
        .then((response) => {
          this.setState({ playlists: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
      }
      handlePlaylistAdded(playlist) {
        let playlists = this.state.playlists.slice();
        playlists.push(playlist);
        this.setState({ playlists: playlists });
      }
    
    

    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>It's goodsss to be home</p>
                <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" />
            </div>
        )

    }
}

export default Home
