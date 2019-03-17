import React from 'react';
import ThumbnailNote from './thumbnailNote';
import NotefulContext from './NotefulContext';

export default class Note extends React.Component {

    static contextType = NotefulContext;

    render() {

        let note = this.context.notes.find(checkNote =>{
            return checkNote.id === parseInt(this.props.match.params.noteId)
        })||"";

        return (
            <div>
                <div className="thumbnail">
                    <ThumbnailNote data={note} key={note.id} id={note.id}/>
                </div>
                <div>
                    {note.content}
                </div> 
            </div>
        )
    }
}