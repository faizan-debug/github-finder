import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';


class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  //Function to show random users o page
  async componentDidMount () {
    this.setState ({ loading: true});
    const res = await axios.get (`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState ({ users: res.data, loading: false});
  }

  //Function is called from search component by passing props up
  searchUsers = async (text) => {
    this.setState ({ loading: true});
    const res = await axios.get (`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState ({ users: res.data.items, loading: false})
    console.log(res.data);
  }

  //Function is called from user Item component to display user details
  getUser = async (username) => {
    this.setState ({ loading: true});
    const res = await axios.get (`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState ({ user: res.data, loading: false});
  }

  //Function is called from user.js component to display the latest repos from Github
  getUserRepos = async (username) => {
    this.setState ({ loading: true});
    const res = await axios.get (`https://api.github.com/users/${username}/repos?per_page=5&sort=created%20asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState ({ repos: res.data, loading: false});
  }

  //Function is called from search component to clear users from state
  clearUsers = () => this.setState({users: [], loading: false})

  //Function is called from search component to raise an alert fro empty text field
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setTimeout (() => this.setState({alert: null}), 5000)
  }
  
  render () {
    const {users, loading, user, repos} = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Routes>
            {/*Route for the Home page */}
            <Route path='/' element={(
              <Fragment>
               <Search searchUsers={this.searchUsers} 
               clearUsers={this.clearUsers}
               showClear={users.length > 0 ? true : false}
               setAlert={this.setAlert}
                />
              <Users loading={loading} users={users}/>
              </Fragment>
    )}>

            </Route>
             {/*Route for the Home page */}
             <Route path='/about' Component={About}/> 

             {/*Route for user detail page */}
             <Route exact path='/user/:login' element={ props => (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading}/>
             )}/> 


          </Routes>
       
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
