import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalPlaylist from '../ModalPlaylist/ModalPlaylist'
// import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TablePlaylist extends Component {

  render() {

    let playlists = this.props.playlists;

    playlists = playlists.map((playlist) => 
      <Table.Row key={playlist._id}>
        <Table.Cell>{playlist.list}</Table.Cell>
        <Table.Cell>{playlist.listtype}</Table.Cell>
        {/* <Table.Cell>
          <ModalPlaylist
            headerTitle='Edit Playlist'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            playlistID={playlist._id}
            // onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          /> */}
          {/* <ModalConfirmDelete
            headerTitle='Delete User'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
         </Table.Cell> */}
      </Table.Row>
    );

    // Make every new user appear on top of the list
    playlists =  [...playlists].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>List</Table.HeaderCell>
            <Table.HeaderCell>List Type</Table.HeaderCell>
            {/* <Table.HeaderCell>Actions</Table.HeaderCell>  */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playlists}
        </Table.Body>
      </Table>
    );
  }
}

export default TablePlaylist;
