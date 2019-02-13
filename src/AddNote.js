import React, {Component} from 'react';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
import './AddNote.css';


export default class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            folder: '',
            validName: false,
            validContent: false,
            validFolder: false,
            validateAll: false,
            validationMessages: {
                name: '',
                content: '',
                folder: ''
            }           
        }
    }

    static contextType = NotefulContext;

    nameChange(value) {
        this.setState({
            name: value
        }, ()=>{this.validateName(value)})
    }

    validateName(value) {
        let hasError = false;
        const errorMessages = {...this.state.validationMessages};
        value = value.trim();
        if (value.length < 3) {
            hasError = true;
            errorMessages.name = 'Name must be greater than 2 characters'
        }
        else if (this.context.notes.find(notes=>notes.name === value)) {
            hasError = true;
            errorMessages.name = 'That name already exists';
        }
        else {
            hasError = false;
            errorMessages.name = '';
        }
        
        this.setState({
            validationMessages: errorMessages,
            validName: !hasError
        }, ()=>this.validateForm())

    }

    changeContent(value) {
        this.setState({
            content: value
        }, ()=>this.validateContent(value))
    }

    validateContent(value) {
        let hasError = false;
        const errorMessages = {...this.state.validationMessages};
        value = value.trim();
        if (value.length === 0) {
            hasError = true;
            errorMessages.content = 'Add some content'
        }       
        this.setState({
            validationMessages: errorMessages,
            validContent: !hasError
        }, ()=>this.validateForm())
    }

    changeFolder(value) {
        this.setState({
            folder: value,
            validFolder: true
        }, ()=>this.validateForm())
    }

    validateForm() {
        this.setState({
            validateAll: this.state.validName && this.state.validContent && this.state.validFolder
        })
    }

    addNewNote(e) {
        e.preventDefault();
        let modDate = new Date().toISOString();
        const noteFolderId = this.context.folders.find(folder=>{
            return folder.name === this.state.folder
        }).id
        const newNote = JSON.stringify({name: this.state.name, folderId: noteFolderId, id: this.state.name, content: this.state.content, modified: modDate})
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: newNote,
            headers: {
              'content-type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            throw new Error('Something went wrong')
        })
        .then(jres => {
            this.context.addNote(this.state.name, this.state.content, noteFolderId)
            this.props.history.goBack();
        })
        .catch(err => {
            console.log(err.message);
            if (err.message === 'Failed to fetch') {
                console.log('Did you start the noteful-json-server at localhost:9090?')
            }
        })
    }

    render() {
        const folderOptions = this.context.folders.map((folder, i) => {
            return <option value={folder.name} key={i}>{folder.name}</option>
        })

        return(
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        onChange={(e)=>this.nameChange(e.target.value)} />
                        <ValidationError hasError={!this.state.validName} message={this.state.validationMessages.name} />
                        <label htmlFor="folderSelect">Folder: </label>
                    <select 
                        id="folderSelect"
                        onChange={(e)=>this.changeFolder(e.target.value)}>
                        <option value=''>Choose a folder</option>
                        {folderOptions}
                    </select>
                </div>
                <div className="content-area">
                    <label className="content-label" htmlFor="content">Content: </label>
                    <textarea 
                        name="content" 
                        id="content"
                        onChange={(e)=>this.changeContent(e.target.value)} />
                        <ValidationError hasError={!this.state.validContent} message={this.state.validationMessages.content} />
                </div>
                <button 
                    type="submit" 
                    disabled={!this.state.validateAll}
                    onClick={(e)=>this.addNewNote(e)}
                    >Save Note</button>
            </form>
        )
    }
}