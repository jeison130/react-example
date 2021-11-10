import './App.css';
// import Contact from './pages/contact';
// import Home from './pages/home';
// import Users from './pages/users';
// import Header from './components/header';
import Encuestas from './pages/encuestas';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import constantes from './constantes'
import Login from './pages/login';

// funciones y hooks
function App() {
  const [ usuarios, setUsuarios ] = useState([]);
  const isUser = localStorage.getItem('token');

  useEffect(() => {
    axios.get(constantes.URL_SERVIDOR + '/usuarios', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then((response) => {
      setUsuarios(response.data);
    });
  }, [setUsuarios]);

  const guardarUsuario = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      nombres: form.nombres.value,
      apellidos: form.apellidos.value,
      email: form.email.value,
      contrasena: form.contrasena.value,
    };

    axios.post('http://localhost:5000/usuarios', data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then((response) => {
        window.history.back();
      });
  }
  
  let menu = '';

  if(isUser) {
      menu = <><li className="nav-item">
              <Link className="nav-link" to='/usuarios'>Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/encuestas'>Encuestas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/secciones'>Secciones</Link>
            </li></>
  }

  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to='/'>Inicio</Link>
              </li>

              {menu}
            </ul>
          </div>
        </div>
      </nav>

        <Switch>
          <Route exact path="/usuarios">
            <h1>Usuarios</h1>
            <Link className="btn btn-primary" to="/usuarios/crear">Crear usuario</Link>
            <table className="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {usuarios.map((usuario, key) =>
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombres}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <Link className="btn btn-primary" 
                    to={"/usuarios/"+ usuario.id +"/encuestas"}>
                      Crear encuesta
                    </Link>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </Route>

          <Route exact path="/usuarios/:usuarioId/encuestas">
              <Encuestas></Encuestas>
          </Route>

          <Route exact path="/usuarios/crear">
            <form onSubmit={guardarUsuario}>
              <div className="row">
                <div className="col-5">

                <div>
                  <label className="form-label">Nombres</label>
                  <input 
                    type="text" 
                    name="nombres" className="form-control"></input>
                </div>
              
                <div>
                  <label className="form-label">Apellidos</label>
                  <input 
                    type="text" 
                    name="apellidos" className="form-control"></input>
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    name="email" className="form-control"></input>
                </div>

                <div>
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    name="contrasena" className="form-control"></input>
                </div>

                </div>
              </div>
              
                <button className="btn btn-success" type="submit">Guardar</button>
                <Link className="btn" to="/usuarios">Volver</Link>
            </form>
          </Route>

          <Route exact path="/encuestas">
            <p>En la pagina de encuestas</p>

            <select name="ciudad">
              <option value="1">Mocoa</option>
              <option value="2">Villagarzon</option>
              <option value="3">Sibundoy</option>
            </select>

            <select name="usuario">
                {usuarios.map((usuario) => 
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombres} {usuario.apellidos}
                  </option>
                )}
            </select>
          </Route>

          <Route exact path="/secciones">
            <p>En la pagina de secciones</p>
          </Route>

          <Route exact path="/login">
            <Login></Login>
          </Route>

          <Route path="/">
              <div>
                <h1>Menu principal</h1>
              </div>
          </Route>
        </Switch>


      </div>
    </Router>
    // <Router>
    //   <div>
    //     <Header></Header>

    //     <Switch>
    //       <Route path="/users/:name">
    //         <Users></Users>
    //       </Route>


    //       <Route path="/contact">
    //         <Contact></Contact>
    //       </Route>
    //       <Route path="/">
    //         <Home></Home>
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
