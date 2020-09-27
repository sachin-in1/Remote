import React, { Component } from 'react'
import TablePlaylist from './TablePlaylist/TablePlaylist'
import axios from 'axios'
import { Container } from 'semantic-ui-react';
// import ModalPlaylist from './ModalPlaylist/ModalPlaylist'
import Modal from './Modal/Modal'

class PlaylistView extends Component {
    constructor() {
        super();
        this.state = {
            // playlists:[]
            modalon: false
        }
        this.state={playlists:[],playlist:{list:'',listtype:''}}
        this.updatePlaylists = this.updatePlaylists.bind(this);
    
        this.fetchPlaylists = this.fetchPlaylists.bind(this);
        this.handlePlaylistAdded = this.handlePlaylistAdded.bind(this);
    }
    componentDidMount(){
        this.fetchPlaylists();    
    }
    
    updatePlaylists (playlistObject) {
    this.setState(playlistObject)
    }

    fetchPlaylists(list) {
        axios.get('/playlist/')
        .then((response) => {
            this.setState({ playlists: response.data });
        })
        .catch((err) => {
            console.log(err);
        });
    }
   
    toggleModal = () => {
        this.setState({ modalon: !this.state.modalon });
    }
    handlePlaylistAdded(event) {
        console.log('playlist handleSubmit, list: ')
        // console.log(event.list)
        // console.log(event.listtype)
		//request to server to add a new playlist
		axios.post('/playlist/', {
			list: event.list,
			listtype: event.listtype
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
                    console.log('successful playlist add')
                    let playlists = this.state.playlists.slice()
                    let playlist = {list:event.list,listtype:event.listtype}
                    playlists.push(playlist)
                    this.setState({ playlists: playlists })
                    console.log(this.state.playlists);
				} else {
					console.log('playlist already available')
				}
			}).catch(error => {
				console.log('playlist add error: ')
				console.log(error)

			})
	}
    render() {
        return (
            <Container>
            {/* <ModalPlaylist
                headerTitle='Add Playlist'
                buttonTriggerTitle='Add New'
                buttonSubmitTitle='Add'
                buttonColor='green'
                onPlaylistAdded={this.handlePlaylistAdded}
                updatePlaylists = {this.updatePlaylists}
                server={this.server}
                socket={this.socket}
            /> */}
            <button onClick={this.toggleModal}>Add</button>
            <Modal closeModal={this.toggleModal} modalon={this.state.modalon} />
            <TablePlaylist
                playlists={this.state.playlists}
                // server={this.server}
                onPlaylistAdded={this.handlePlaylistAdded}
                updatePlaylists = {this.updatePlaylists}
            ></TablePlaylist>
            </Container>
        )

    }
}

export default PlaylistView
