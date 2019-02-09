import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import FolderError from './FolderError';
import PropTypes from 'prop-types';


function FolderThumbnail(props) {
    return (<li className="folders">
        <NavLink to={`/folder/${props.data.id}`}>{props.data.name}</NavLink>
    </li>)
}

FolderThumbnail.propTypes = {
    data: PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

class  MainSidebar extends React.Component {

    static contextType = NotefulContext

    render() {
    
    const folders = this.context.folders.map((folder)=>{
        return <FolderError key={folder.id}><FolderThumbnail data={folder} key={folder.id} /></FolderError>
    })

        return (
            <ul>
                {folders}
                {<button onClick={() => this.props.history.push('/newfolder')}>Add Folder</button>}
            </ul>
        )
    }
}

export default MainSidebar;