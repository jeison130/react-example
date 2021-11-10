import axios from "axios";

function Login(){
    const login = (event) => {
        event.preventDefault();

        const form = event.target;

        const data = {
            email: form.email.value,
            password: form.password.value,
        };

        axios.post('http://localhost:5000/login', data)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
            });
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
    }

    return (
        <div>
            <form onSubmit={login}>
              <div className="row">
                <div className="col-5">

                <div>
                  <label className="form-label">Email</label>
                  <input 
                    type="text" 
                    name="email" className="form-control"></input>
                </div>
              
                <div>
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    name="password" className="form-control"></input>
                </div>

                </div>
              </div>
              
                <button className="btn btn-success" type="submit">Guardar</button>
                <button type="button" onClick={cerrarSesion}>Cerrar sesion</button>
            </form>
        </div>
    );
}

export default Login;