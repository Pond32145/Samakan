import { FC } from 'react';
import { Link } from 'react-router-dom'

const MenuPage: FC = () => {
    return (
        <>
            <h1 className='text-center text-3xl m-4 mr-40 ml-40 p-4 rounded-md text-red-50 bg-blue-400'>Menu</h1>
            <div className="grid grid-cols1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 mr-10 ml-10">
               
               <Link to="/admin/news" className='btnfc text-center'> NewsPage </Link>
               <Link to="/admin/user" className='btnfc text-center'> UserPage </Link>
               {/* <Link to="/admin/member" className='btnfc text-center'> MemberPage</Link> */}
               <Link to="/admin/memberlist" className='btnfc text-center'> MemberList</Link>
               
               
               <button className='btnfc'>Menu 4</button>
               <button className='btnfc'>Menu 5</button>
               <button className='btnfc'>Logout</button>
            </div>
        </>
    );
};

export { MenuPage }