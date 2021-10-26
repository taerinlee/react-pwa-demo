import { useState } from "react";

const List = () => {
    const [list, setList] = useState([]);

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => setList(json))

    return (
        <ul>
            {list?.map((item, idx) => (
                <li key={`list=${idx}`}>{item.name}</li>
            ))}
        </ul>
    )
};

export default List;