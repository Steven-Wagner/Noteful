import React from 'react';
import ThumbnailNote from './thumbnailNote';
import NotefulContext from './NotefulContext';
import NoteError from './NoteError';

export default class Folder extends React.Component {

    static contextType = NotefulContext;

    render() {
        const notes = this.context.notes.filter(note=>{
            return note.folderId === this.props.match.params.folderId;
        })
        .map(thisFoldersNote=>{
            return <NoteError key={thisFoldersNote.id}><ThumbnailNote data={thisFoldersNote} key={thisFoldersNote.id} /></NoteError>
        })

        return (
            <ul>
                {notes}
                <button onClick={()=>this.props.history.push('/addnote')}>Add Note</button>
            </ul>
        )
    }
}