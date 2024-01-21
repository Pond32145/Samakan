import { FC } from 'react';
import { Link } from 'react-router-dom'
const Header: FC = () => {
    return <>
        <div className='fixed bg-red-500 w-full '>
            <div>
                <img className='rounded-full w-16 h-16 absolute mt-2 ml-10'
                    src="https://upload.wikimedia.org/wikipedia/th/e/e1/Spider-Man_PS4_cover.jpg" alt="" />

                <h1 className='absolute mt-7 ml-28 text-gray-50 text-xl'>NAPHAT</h1>
            </div>


            <div className="flex flex-row gap4 p-4 justify-end ">
                <Link to="/admin/home" className='btn-nav'>
                    HOME
                </Link>
                <Link to="/admin/menu" className='btn-nav'>
                    MENU
                </Link>
            </div>
        </div>

        <div className='p-10'></div>
    </>;
};

export { Header }