import React from 'react';
import './thumbnailNote.css';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';

function ThumbnailNote(props) {
    return (
        <div className="thumbnail-note" onClick={()=>props.history.push(`/note/${props.data.id}`)}>
            <span className="note-title">{props.data.name}</span> 
            <p>Modified: {format(props.data.modified, 'Do MMM YYYY')}</p>
        </div>
    )
}

export default withRouter(ThumbnailNote);