import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';


function FolderThumbnail(props) {
    return (<li className="folders">
        <NavLink to={`/folder/${props.data.id}`}>{props.data.name}</NavLink>
    </li>)
}

export default class  MainSidebar extends React.Component {

    static contextType = NotefulContext

    render() {
    
    console.log('will this even log', this.context);
    
    const folders = this.context.folders.map((folder)=>{
        return <FolderThumbnail data={folder} key={folder.id} />
    })

        return (
            <ul>
                {folders}
            </ul>
        )
    }
}