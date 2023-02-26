import React , {useState}from 'react';
import './style/style-login.css';


function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    
    return(
        <div className='login'>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <form>      
                            <h2>Iniciar Sesión</h2>
                            
                            <div className='mb-3'>
                                <label className='form-label'>Correo</label>
                                <input className='form-control' name='name-user' type='emailHelp' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' >Contraseña</label>
                                <input className='form-control' name='pass-user' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            
                            <div className='mb-2'>
                                <button className='btn btn-primary' type='button' >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>     
            </div> 
        </div>
    );
  
}
export default Login;