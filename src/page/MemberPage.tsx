import { FC, useState , useEffect } from 'react';
import { string, z } from "zod";
// import { useNavigate } from "react-router-dom";
import { Alert } from '../component/Alert';

interface MemberProps {
    isEdit:boolean;
    id:number;
    whenSuccess: () => void;
}


const MemberPage: FC<MemberProps> = ({whenSuccess, isEdit, id}) => {
    useEffect(() =>{
        if(isEdit){
            getMemberByid();
        }
    }, [])

    //script
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordagain, setPasswordAgain] = useState('');
    const [role, setRole] = useState('ADMIN');


    // const navigate = useNavigate();

    const [title, setTitle] = useState('Error')
    const [messgae, setMessage] = useState('')
    const [show, setShow] = useState(false)



    const MemberModel = z.object({
        email: string().email({ message: "กรุณาใส่ข้อมูลให้อยู่ในรูปแบบอีเมล" }),
        name: string().min(1, { message: "กรุณากรอกชื่อ" })
            .max(50, { message: "กรุณากรอกชื่อ" }),
        password: string().min(8, { message: "รหัสผ่านต้องมีความยาวไม่น้อยกว่า 8 ตัวอักษร" }),
        passwordagain: string().min(8, { message: "รหัสผ่านต้องมีความยาวไม่น้อยกว่า 8 ตัวอักษร" }),



    })


    /**
     * call save api
     */
    const createMember = async () => {
        const resp = await fetch("/api/auth/user", {
            method: "POST",
            headers: {
                Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(frm),
            body: JSON.stringify({
                email,
                name,
                password,
                role,
            }),

        })
        if (resp.status === 200) {
            //TODO: cloase dialog
            whenSuccess();
        } else {
            console.log(resp.statusText)
        }

    }
    /**
     * cal get by id
     */
    const getMemberByid = async () => {
        const resp = await fetch("/api/auth/user/" +id , {
            method: "GET",
            headers: {
                Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
                "Content-Type": "application/json",
            },
           

        })
        if (resp.status === 200) {
            //TODO: cloase dialog
            const data = await resp.json();
            setEmail(data["email"])
            setName(data["name"])
            setPassword(data["password"])
            setPasswordAgain(data["password"])
            setRole(data["role"])
        } else {
            console.log(resp.statusText)
        }

    }
    
    const updateMember = async () => {
        const resp = await fetch("/api/auth/user/"+id, {
            method: "PUT",
            headers: {
                Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(frm),
            body: JSON.stringify({
                email,
                name,
                password,
                role,
            }),

        })
        if (resp.status === 200) {
            //TODO: cloase dialog
            whenSuccess();
        } else {
            console.log(resp.statusText)
        }

    }

    const onSaveClick = () => {
        const model = MemberModel.safeParse({ email, password, name, passwordagain ,role});
        if (model.success && (password === passwordagain)) {
            // navigate("/admin/menu")
            // loginApi(model.data.email, model.data.password);
            if(isEdit){
                updateMember();
            }else{
                createMember();

            }
            setTitle("Saved Successfully");
            setMessage("Data has been saved.");
            setShow(true);
            // console.log(model.data)

        } else if (email === "") {
            setTitle("Login Fail.Email !!");
            setMessage("Pleaes Enter your email");
            setShow(true);
            // console.log(model.error)
            // alert(model.error)

        } else if (name.length < 1) {
            setTitle("Login Fail.Name !!");
            setMessage("Pleaes Enter your name");
            setShow(true);
            // console.log(model.error);
            // alert(model.error)

        } else if (password.length < 8) {
            setTitle("Login Fail. Password");
            setMessage("Login Fail. Password 8 up");
            setShow(true);
            // console.log(model.error);
            // alert(model.error)

        } else if (password !== passwordagain) {
            setTitle("Login Fail.");
            setMessage("Passwords do not match");
            setShow(true);
            // console.log(model.error)
            // alert(model.error)

        } else {

            // console.log(model.error)
            // alert(model.error)

        }

    }



    // const loginApi = async (username: string, password: string) => {
    //     try {
    //         const resp = await fetch("/api/auth/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 username,
    //                 password,
    //             }),
    //         });
    //         if (resp.status === 200) {
    //             const result = await resp.text();
    //             console.log(result)
    //             if (result != "fail") {
    //                 navigate("/admin/menu");
    //             } else {
    //                 setTitle("Login Error");
    //                 setMessage("Login Fail. Please try again");
    //                 setShow(true);
    //             }
    //         } else {
    //             setTitle("Servser Error");
    //             setMessage("Login Fail. Please contact admin");
    //             setShow(true);
    //         }
    //     } catch (e) {
    //         setTitle("Servser Error");
    //         setMessage("Login Fail. Please contact admin");
    //         setShow(true);
    //     }
    // }


    return <>


        <div className='flex flex-col rounded-lg p-5   w-96 justify-center  '>

            <h1 className='m-auto text-2xl'>MemberPage</h1>
            <label htmlFor="email">Email Address</label>
            <input type="email" name=""
                id="email"
                className='npru-input'
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor="fname" className="name">Name </label>
            <input type="text" name=""
                id="fname"
                className='npru-input'
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            <label htmlFor="password" className="name">Password </label>
            <input type="password" name=""
                id="password"
                className='npru-input'
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label htmlFor="password-again" className="name">Confirm Password  </label>
            <input type="password" name=""
                id="password-again"
                className='npru-input'
                placeholder="Confirm password"
                onChange={e => setPasswordAgain(e.target.value)}
                value={passwordagain}
            />

            <label htmlFor="role" className="name">Role</label>
            <select
                name="" id="role" className='npru-input'
                onChange={e => setRole(e.target.value)}
                value={role}>
                <option>Admin</option>
                <option>User</option>
            </select>


            <button className='npru-button'
                onClick={onSaveClick}>
                <span>SAVE</span>
            </button>



            {/* <h1>{email} {password}</h1> */}
            {/* <input className='npru-button' type="submit" value="SAVE" /> */}


        </div>
        <Alert title={title} message={messgae} show={show} setShow={setShow} />

    </>
}

export { MemberPage }