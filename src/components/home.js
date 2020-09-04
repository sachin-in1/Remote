import React, { Component } from 'react'
import TablePlaylist from './TablePlaylist/TablePlaylist'
import axios from 'axios'
import { Container } from 'semantic-ui-react';
import ModalPlaylist from './ModalPlaylist/ModalPlaylist'
import { Route } from 'react-router-dom';
class Home extends Component {
    constructor() {
        super();
        // this.state={
        //     playlists:[]
        // }
    }
    // componentDidMount() {
    //     this.fetchPlaylists();
    // }
    
    

    render() {
        return (
            <div>
                <p>It's good to be home</p>
            </div>
        )

    }
}

export default Home
