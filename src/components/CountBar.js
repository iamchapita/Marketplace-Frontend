import React from "react";

function CountBar ({name, id}){
   

    return(
        <div className="count-bar">
            <i className="material-icons icon-perfil" >person</i>
            <a className="link-perfil" >{name}</a>

        </div>
    )
}
export default CountBar;