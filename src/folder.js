import React from 'react';
import ThumbnailNote from './thumbnailNote';
import NotefulContext from './NotefulContext';

export default class Folder extends React.Component {

    static contextType = NotefulContext;

    render() {
        const notes = this.context.notes.filter(note=>{
            return note.folderId === this.props.match.params.folderId;
        })
        .map(thisFoldersNote=>{
            return <ThumbnailNote data={thisFoldersNote} key={thisFoldersNote.id} />
        })

        return (
            <ul>
                {notes}
            </ul>
        )
    }
}