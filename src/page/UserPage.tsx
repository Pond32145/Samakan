import { FC, useState, useEffect } from 'react';

interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

interface RowProps {
    data:User;
}

const UserRow: FC<RowProps> = ({ data }) => {
    return (
        <>
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.address.street}</td>
                <td>{data.address.suite}</td>
                <td>{data.address.city}</td>
                <td>{data.address.zipcode}</td>
                <td>
                    {data.address.geo.lat} {data.address.geo.lng}
                    </td>
                <td>{data.phone}</td>
                <td>{data.website}</td>
                <td>{data.company.name}</td>
                <td>{data.company.catchPhrase}</td>
                <td>{data.company.bs}</td>
            </tr>
        
    </>
    )
}

const UserPage: FC = () => {
    //state
    const [users, setUsers] = useState<User[]>();
    useEffect(() =>{
        //fetch data here
        usersApi();
    }, []);
    //api
    const usersApi = async()=>{
        try{
            const resp = await fetch("https://jsonplaceholder.typicode.com/users");
            const json = await resp.json();
            setUsers(json);
        }catch(e){

        }
    }

    //template
    return (
        <>
            <h1>User</h1>
            {/* <button className='btnfc' onClick={usersApi}>
                Load User
            </button> */}
            <table>
                <thead>
                    <tr>
                        <th rowSpan={2}>Id</th>
                        <th rowSpan={2}>Name</th>
                        <th rowSpan={2}>User Name</th>
                        <th rowSpan={2}>Email</th>
                        <th colSpan={5}>Address</th>
                        <th rowSpan={2}>Phone</th>
                        <th rowSpan={2}>Website</th>
                        <th colSpan={3}>Company</th>
                    </tr>
                    <tr>
                        <th>Street</th>
                        <th>Suite</th>
                        <th>City</th>
                        <th>ZipCode</th>
                        <th>Geo</th>
                        <th>Name</th>
                        <th>catchPhrase</th>
                        <th>bs</th>

                    </tr>
                </thead>
                
                <tbody>
                    {users?.map((user) => (
                         <UserRow data={user}/>
                    ))}
                   
                </tbody >
            </table>
        </>
    )
}

export { UserPage }