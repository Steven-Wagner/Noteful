import React, { Component } from 'react';
import { Route, Link,} from 'react-router-dom';
import './App.css';
import NotefulContext from './NotefulContext';
import MainMain from './main'
import MainSidebar from'./mainSidebar';
import Folder from './folder';
import SelectedFolder from './selectedFolder';
import Note from './note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    }
  }

  deleteNote = noteId =>{
    const updatedNotes = this.state.notes.filter(note=>{
      return noteId !== note.id;
    })
    this.setState({
      notes: updatedNotes
    })
  }

  addFolder = newFolder => {
    this.setState({
      folders: [{id:newFolder, name:newFolder}, ...this.state.folders]
    })
  }

  addNote = (noteName, noteContent, noteFolderId) => {
    let modDate = new Date();
    modDate = modDate.toISOString()

    this.setState({
      notes: [...this.state.notes, {id: noteName, name: noteName, content: noteContent, folderId: noteFolderId, modified: modDate}]
    })
  }

  componentDidMount() {
    const fetchFolders = fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response=>{
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      return response.json()
    })
    .then(jresponse=> {
      this.setState({
        folders: jresponse
      })
    })

    const fetchNotes = fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response=>{
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      return response.json()
    })
    .then(jresponse=> {
      console.log(jresponse);
      this.setState({
        notes: jresponse
      })
    })

    Promise.all([fetchFolders, fetchNotes])
      .catch(err=>{
        console.log(err.message);
      }) 
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
  }

    return (
      <div className="App">
        <header>
          <h1><Link to='/'>Noteful</Link></h1>
        </header>
        <div className="content">
          <NotefulContext.Provider value={contextValue}>
          {/*would I turn this Nav eleemnt into a variable and then place it here as a single line?*/}
            <nav role="navigation" className="sidebar">
              <Route 
                exact path="/"
                component={MainSidebar}
              />
              <Route 
                path="/folder"
                component={MainSidebar}
              />
              <Route
                path="/note/:noteId"
                component={SelectedFolder}
              />
            </nav>
            <main role='main'>
              <Route 
                exact path="/"
                component={MainMain}
              />
              <Route 
                path="/folder/:folderId"
                component={Folder}
              />
              <Route
                path="/note/:noteId"
                component={Note}
              />
              <Route
                path="/newfolder"
                component={AddFolder}
              />
              <Route
                path="/addnote"
                component={AddNote}
              />
            </main>
          </NotefulContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
