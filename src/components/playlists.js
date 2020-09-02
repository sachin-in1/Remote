import React, { Component } from 'react'
import TablePlaylist from './TablePlaylist/TablePlaylist'
// import axios from 'axios'
import { Container } from 'semantic-ui-react';
import ModalPlaylist from './ModalPlaylist/ModalPlaylist'

class PlaylistView extends Component {
    constructor() {
        super();
        this.state={
        }
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
            playlists={this.props.playlists}
            // server={this.server}
            ></TablePlaylist>
            </Container>
            </div>
        )

    }
}

export default PlaylistView
