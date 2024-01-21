import { FC, useState } from 'react'
import { string, z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Alert } from '../component/Alert';

const LoginForm: FC = () => {

    // script
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('Error')
    const [messgae, setMessage] = useState('')
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    // validation schema
    const loginModel = z.object({
        email: string().email({ message: "กรุณาใส่ข้อมูลให้อยู่ในรูปแบบอีเมล" }),
        password: string().min(8, { message: "รหัสผ่านต้องมีความยาวไม่น้อยกว่า 8 ตัวอักษร" }),
    })

    //login button event
    const onLoginClick = () => {
        // console.log(email, password);
        // try {
        //     const model = loginModel.parse({email, password});
        //     console.log(model);
        // }catch (e) {
        //     console.log(e);
        // }

        const model = loginModel.safeParse({ email, password });
        if (model.success) {
            console.log(model.data);
            // TODO: send model.data to api server
            loginApi(model.data.email, model.data.password);
            navigate("/admin/menu")
        } else {
            console.log(model.error);
            // TODO: show error dialog
            setTitle("Login Error");
            setMessage("Login Fail. Password 8 up");
            setShow(true);
        }

    }

    const loginApi = async (username: string, password: string) => {
        try {
            const resp = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (resp.status === 200) {
                const result = await resp.text();
                console.log(result)
                if (result != "fail") {
                    sessionStorage.setItem("AUTH_TOKEN","Bearer " + result);
                    // navigate("/admin/menu");
                } else {
                    setTitle("Login Error");
                    setMessage("Login Fail. Please try again");
                    setShow(true);
                }
            } else {
                setTitle("Servser Error");
                setMessage("Login Fail. Please contact admin");
                setShow(true);
            }
        } catch (e) {
            setTitle("Servser Error");
            setMessage("Login Fail. Please contact admin");
            setShow(true);
        }
    }

    return <>
        <div className="flex flex-col rounded-lg p-5 border border-blue-800 bg-gray-800  m-auto w-full sm:w-1/2 md:w-1/3">
            <h1 className="m-auto">
                <img src="../public/React-icon.svg.png" alt="" className='w-32' />
            </h1>
            <label htmlFor='email' className='text-white' >Email</label>
            <input id="email" type="text" className="npru-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor='pass' className='text-white'>Password</label>
            <input
                id="pass"
                type="password"
                className="npru-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="npru-button"
                onClick={onLoginClick}>
                <div className='flex flex-row justify-center gap-2'>
                    <ArrowRightOnRectangleIcon className='w-7' />
                    <span>Login</span>
                </div>
            </button>
            {/* <h1>
                {email} {password}
            </h1> */}
        </div>
        <Alert title={title} message={messgae} show={show} setShow={setShow} />
    </>;
};

export { LoginForm };