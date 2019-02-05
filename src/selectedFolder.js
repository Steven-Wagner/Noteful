import React from 'react';

function SelectedFolder(props) {

    const currentNote = props.data.notes.find(note=>{
        return note.id === props.match.params.noteId
    })

    const currentFolder = props.data.folders.find(folder=> {
        return folder.id === currentNote.folderId
    })
        
    

    return (
        <div className="selected-folder">
            <div className="current-folder">
                {currentFolder.name}
            </div>
            <div>
                <button onClick={()=>props.history.goBack()}>
                    Back
                </button>
            </div>
        </div>
    )
}

export default SelectedFolder