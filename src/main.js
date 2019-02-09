import React, { Component } from 'react';
import ThumbnailNote from './thumbnailNote';
import NotefulContext from './NotefulContext'
import NoteError from './NoteError';

export default class MainMain extends Component {

    static contextType = NotefulContext;

    render() {
        console.log(this.context);
        const notes = this.context.notes.map((note)=> {
            return <NoteError key={note.id}><ThumbnailNote data={note} key={note.id} id={note.id} /></NoteError>
        })

        return (
            <ul>
                {notes}
                <button onClick={()=>this.props.history.push('addnote')}>Add Note</button>
            </ul>
        )
    }
}