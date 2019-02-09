import React from 'react';
import './thumbnailNote.css';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

function clickedDelete(event, noteId, deleteNoteCallback) {
    event.stopPropagation()
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        })
        .then(response=>{
            if (!response.ok) {
                return response.json().then(error => {
                  throw error
                })
              }
        })
        .then(jsonResponse=>{
            deleteNoteCallback(noteId);
            
        })
        .catch(err=>{
            console.error(err)
        })
}

function ThumbnailNote(props) {
    return (
        <NotefulContext.Consumer>{
            (context)=> (
            <div className="thumbnail-note" onClick={()=>props.history.push(`/note/${props.data.id}`)}>
                <span className="note-title">{props.data.name}</span> 
                <p>Modified: {format(props.data.modified, 'Do MMM YYYY')}</p>
                <button onClick={(event)=>{clickedDelete(event, props.data.id, context.deleteNote); props.history.push('/')}}>Delete</button>
            </div>
        )}
        </NotefulContext.Consumer>
    )
}

ThumbnailNote.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired
    }),
}

export default withRouter(ThumbnailNote);