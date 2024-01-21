import { FC , ReactNode } from 'react';



interface Props {
    children: ReactNode
}

const LoginPage: FC <Props>= ({children}) => {


    //template
    return (
        <>
            <div className="flex w-screen h-screen bg-blue-400 ">
                {children}
                
            </div>
        </>
    );
};

export { LoginPage };