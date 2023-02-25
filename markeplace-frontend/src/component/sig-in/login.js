import React from 'react';


function Login (){
    
    return(
        
        <div className='container'>
                <div className='card-body'>
                    <form>      
                        <h2>Iniciar Sesion</h2>
                        <br></br>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre de usuario</label>
                            <input className='form-control' name='name-user' type='emailHelp' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' >Contraseña</label>
                            <input className='form-control' name='pass-user' type='password'/>
                        </div>
                        <br></br>
                        <div className='mb-2'>
                            <button className='btn btn-primary' type='button' >Enviar</button>
                        </div>
                    </form>
                 </div>
        </div> 
    );
  
}
export default Login;