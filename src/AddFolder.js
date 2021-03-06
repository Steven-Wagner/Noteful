import React, {Component} from 'react';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
import './AddFolder.css';

export default class AddFolders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFolder: '',
            nameValid: false,
            validationMessage: ''
        }
    }

    static contextType = NotefulContext;

    updateNewFolder(newFolder) {
        this.setState({
            newFolder
        },
        () => this.validateFolderName(newFolder))
    }

    validateFolderName(fieldValue) {
        let fieldErrors = {...this.state.validationMessage};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors = 'Name is required';
          hasError = true;
        } else {
          if (fieldValue.length < 3) {
            fieldErrors = 'Name must be at least 3 characters long';
            hasError = true;
          } else {
            fieldErrors = '';
            hasError = false;
          }
        }
    
        this.setState({
          validationMessage: fieldErrors,
          nameValid: !hasError
        });
    
    }

    createNewFolder(e, addFolder) {
        e.preventDefault();
        const folder = JSON.stringify({name: this.state.newFolder})
        fetch(`http://localhost:8000/api/folders`, {
            method: 'POST',
            body: folder,
            headers: {
                'content-type': 'application/json'
            },
            })
            .then(response=>{
                if (response.ok) {
                    return response.json()
                  }
                throw new Error('Sorry, something went wrong.')
            })
            .then(jres => {
                addFolder(this.state.newFolder, jres.id);
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
        return(
            <form>
                <div className="folder-name">
                    <label htmlFor="new-folder-name">Name: </label>
                    <input 
                        type="text" 
                        id="new-folder-name" 
                        name="new-folder" 
                        defaultValue="New Folder" 
                        onChange={e => this.updateNewFolder(e.target.value)}/>
                </div>
                <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessage}/>
                <button 
                    type="submit" 
                    onClick={(e) => this.createNewFolder(e, this.context.addFolder)}
                    disabled={!this.state.nameValid}>
                Create Folder</button>
            </form>
        )
    }
}