import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/gitub/GithubState'
import AlertState from './context/alert/AlertState';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => { 
  
    return (
      <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/about' Component={About} />
                <Route exact path='/user/:login' Component={User} />
                <Route Component={NotFound} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
    );
  }

export default App;
