import React from 'react';
import './SideDrawer.css';
const drawerToggleButton = props =>(
    <button className = "clsToggleButton" onClick={props.click}>
        <div className="clsToggleButtonLine" ></div>
        <div className="clsToggleButtonLine"></div>
        <div className="clsToggleButtonLine"></div>

    </button>
);
export default drawerToggleButton;