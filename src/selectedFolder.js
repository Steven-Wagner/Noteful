import React from 'react';
import NotefulContext from './NotefulContext';

class SelectedFolder extends React.Component {

    static contextType = NotefulContext;

    render() {

        const currentNote = this.context.notes.find(note=>{
            return note.id === parseInt(this.props.match.params.noteId)
        })
        const currentFolder = this.context.folders.find(folder=> {
            return folder.id === currentNote.folder_id
        })

            
        

        return (
            <div className="selected-folder">
                <div className="current-folder">
                    {currentFolder.name}
                </div>
                <div>
                    <button onClick={()=>this.props.history.goBack()}>
                        Back
                    </button>
                </div>
            </div>
        )
    }
}

export default SelectedFolder