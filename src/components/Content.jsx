import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';

class Content extends Component {
  render() {
    return (
      <main className="Content">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/notFound" component={ NotFound } />
          <Route exact path="/profile/" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" exact component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
