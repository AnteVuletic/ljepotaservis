import React from 'react';
import "../../styling/popout/popout.css";

const Popout = props => {
    return (
    <div className={!props.read ? "popout__container--visible" : "popout__container--invisible"}>
        <div>
            <span>
                {props.message}
            </span>
            <button onClick={props.closePopout}>Close</button>
        </div>
    </div>);
    
}
export default Popout;