import React from 'react';

function Login (){
    
    return(
        
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <form>      
                        <h5>Ingrese su nombre de usuario y contraseña</h5>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre de usuario</label>
                            <input className='form-control' name='name-user' type='emailHelp' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' >Contraseña</label>
                            <input className='form-control' name='pass-user' type='password'/>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-primary' type='button' >Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  
}
export default Login;