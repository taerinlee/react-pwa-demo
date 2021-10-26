import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const List = () => {
    const history = useHistory();
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setList(json))
    }, [])

    const handleClickMove = (e, { id }) => {
        history.push(`/${id}`);
    }

    return (
        <ul>
            {list?.map((item, idx) => (
                <li key={`list=${idx}`} onClick={(e) => handleClickMove(e, { id: item.id })}>{item.name}</li>
            ))}
        </ul>
    )
};

export default List;
