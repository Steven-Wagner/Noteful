import React from 'react';
import { NavLink } from 'react-router-dom';

function FolderThumbnail(props) {
    return (<li className="folders">
        <NavLink to={`/folder/${props.data.id}`}>{props.data.name}</NavLink>
    </li>)
}

export default function MainSidebar(props) {
    
    const folders = props.data.folders.map((folder)=>{
        return <FolderThumbnail data={folder} key={folder.id} />
    })

    return (
        <ul>
            {folders}
        </ul>
    )
}