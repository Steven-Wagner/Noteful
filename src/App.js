import React, { Component } from 'react';
import { Route, Link,} from 'react-router-dom';
import './App.css';
import dummystore from './dummy-store';
import MainMain from './main'
import MainSidebar from'./mainSidebar';
import Folder from './folder';
import SelectedFolder from './selectedFolder';
import Note from './note';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folderData: dummystore
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><Link to='/'>Noteful</Link></h1>
        </header>
        <div className="content">
          <nav role="navigation" className="sidebar">
            <Route 
              exact path="/"
              render={()=>
                <MainSidebar 
                  data={this.state.folderData} />}
            />
            <Route 
              path="/folder"
              render={()=>
                <MainSidebar 
                  data={this.state.folderData} />}
            />
            <Route
              path="/note/:noteId"
              render={(props)=> 
                <SelectedFolder {...props} data={this.state.folderData} />}
            />
          </nav>
          <main role='main'>
            <Route 
              exact path="/"
              render={()=>
                <MainMain 
                  data={this.state.folderData} />}
            />
            <Route 
              path="/folder/:folderId"
              render={(props)=> <Folder {...props} data={this.state.folderData} />
              }
            />
            <Route
              path="/note/:noteId"
              render={(props)=> 
                <Note {...props} data={this.state.folderData} />}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
