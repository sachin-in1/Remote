import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import PlaylistView from './components/playlist';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,

      playlists:[]
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updatePlaylists = this.updatePlaylists.bind(this)

    this.fetchPlaylists = this.fetchPlaylists.bind(this);
    this.handlePlaylistAdded = this.handlePlaylistAdded.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.fetchPlaylists();
  }

  updateUser (userObject) {
    this.setState(userObject)
  }
  updatePlaylists (playlistObject) {
    this.setState(playlistObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  fetchPlaylists() {
    axios.get('/playlist/')
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
      <div className="App">
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
        path="/playlist"
        render={() =>
          <PlaylistView
          playlists={this.state.playlists}
            updatePlaylists={this.updatePlaylists}
          />}
      />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}

export default App;
