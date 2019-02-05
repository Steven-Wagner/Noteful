import React from 'react';
import ThumbnailNote from './thumbnailNote';

export default function Note(props) {

    const note = props.data.notes.find(checkNote =>{
        return checkNote.id === props.match.params.noteId
    })

    return (
        <div>
            <div className="thumbnail">
                <ThumbnailNote data={note} key={note.id} />
            </div>
            <div>
                {note.content}
            </div>
        </div>
    )
}