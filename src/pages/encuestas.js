import { useParams } from 'react-router-dom';

function Encuestas() {
    const { usuarioId } = useParams();

    return (
        <p>Todas las encuestas del usuario {usuarioId}</p>
    )
}

export default Encuestas;