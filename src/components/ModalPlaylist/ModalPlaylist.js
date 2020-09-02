import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormPlaylist from '../FormPlaylist/FormPlaylist';

class ModalPlaylist extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormPlaylist
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            playlistID={this.props.playlistID}
            onPlaylistAdded={this.props.onPlaylistAdded}
            // onUserUpdated={this.props.onUserUpdated}
            // server={this.props.server}
            // socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalPlaylist;
