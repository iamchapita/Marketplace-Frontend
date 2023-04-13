import React, {useEffect, useState} from "react";

function ChatGeneral ({name}){
    const [sendMessage, setSendMessage] = useState();


    const send = async() =>{
        console.log(sendMessage);
        window.print();

    }

    return (
        <div>
            <div className="container" >
                        
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Mensaje</button>


                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="grid-2" >  
                            <div className="chat-user">
                            </div>
                            <div className="chat-destine" >

                            </div>
                        </div>
                       
                    </div>
                    <div className="modal-footer">
                    <input className="form-control" type="text" onChange={(e)=>setSendMessage(e.target.value) } />
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={()=>send()}  >Enviar</button>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    )

}

export default ChatGeneral;