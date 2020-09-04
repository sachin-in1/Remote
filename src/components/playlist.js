import React, { Component } from 'react'
import TablePlaylist from './TablePlaylist/TablePlaylist'
import axios from 'axios'
import { Container } from 'semantic-ui-react';
import ModalPlaylist from './ModalPlaylist/ModalPlaylist'

class PlaylistView extends Component {
    constructor() {
        super();
        this.state={playlists:[]}
        this.updatePlaylists = this.updatePlaylists.bind(this);
    
        this.fetchPlaylists = this.fetchPlaylists.bind(this);
        this.handlePlaylistAdded = this.handlePlaylistAdded.bind(this);
    }
    componentDidMount(){
        this.fetchPlaylists('asfsdd');    
    }
    
    updatePlaylists (playlistObject) {
    this.setState(playlistObject)
    }

    fetchPlaylists(list) {
        axios.get('http://localhost:8000/playlist/')
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
        return (
            <div>
                hiiiiiii
            <Container>
            <ModalPlaylist
        headerTitle='Add Playlist'
        buttonTriggerTitle='Add New'
        buttonSubmitTitle='Add'
        buttonColor='green'
        onPlaylistAdded={this.handlePlaylistAdded}
        server={this.server}
        // socket={this.socket}
      />
            <TablePlaylist
            playlists={this.state.playlists}
            // server={this.server}
            ></TablePlaylist>
            </Container>
            </div>
        )

    }
}

export default PlaylistView
