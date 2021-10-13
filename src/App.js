import './App.css';
// import Contact from './pages/contact';
// import Home from './pages/home';
// import Users from './pages/users';
// import Header from './components/header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

// funciones y hooks
function App() {
  const [ usuarios, setUsuarios ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/usuarios').then((response) => {
      setUsuarios(response.data);
    });
  }, [setUsuarios]);
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Inicio</Link>
            </li>
            <li>
              <Link to='/usuarios'>Usuarios</Link>
            </li>
            <li>
              <Link to='/encuestas'>Encuestas</Link>
            </li>
            <li>
              <Link to='/secciones'>Secciones</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/usuarios">
            Usuarios
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Email</th>
              </tr>
              </thead>
              <tbody>
              {usuarios.map((usuario, key) =>
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombres}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.email}</td>
                </tr>
              )}
              </tbody>
            </table>
          </Route>

          <Route path="/encuestas">
            <p>En la pagina de encuestas</p>
          </Route>

          <Route path="/secciones">
            <p>En la pagina de secciones</p>
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
