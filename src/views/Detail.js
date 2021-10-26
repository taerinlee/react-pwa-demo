import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(json => setUser(json))
        .catch(setUser(JSON.parse(localStorage.getItem(id))))
    }, [id])

    return (
        <div>name: {user?.name}</div>
    )
};

export default Detail;
