import React from 'react';
import ThumbnailNote from './thumbnailNote';

export default function Folder (props) {
    const notes = props.data.notes.filter(note=>{
        return note.folderId === props.match.params.folderId;
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