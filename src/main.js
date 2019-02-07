import React, { Component } from 'react';
import ThumbnailNote from './thumbnailNote';
import NotefulContext from './NotefulContext'

export default class MainMain extends Component {

    static contextType = NotefulContext;

    render() {
        console.log(this.context);
        const notes = this.context.notes.map((note)=> {
            return <ThumbnailNote data={note} key={note.id} id={note.id} />
        })

        return (
            <ul>
                {notes}
            </ul>
        )
    }
}