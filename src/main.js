import React from 'react';
import ThumbnailNote from './thumbnailNote';

export default function MainMain(props) {

    const notes = props.data.notes.map((note)=> {
        return <ThumbnailNote data={note} key={note.id} />
    })

    return (
        <ul>
            {notes}
        </ul>
    )
}