import {Link} from 'react-router-dom';

function Header() {
    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
            <li>
              <Link to="/users/jeyson">Usuarios</Link>
            </li>
          </ul>
        </nav>
    );
}

export default Header;