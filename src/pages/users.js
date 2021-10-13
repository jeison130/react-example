import {useParams} from 'react-router-dom';

function Users() {
    const params = useParams();

    return (
        <h1>Hola, {params.name}</h1>
    );
}

export default Users;