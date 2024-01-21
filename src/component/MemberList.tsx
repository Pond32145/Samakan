import { FC, useEffect, useState } from 'react'
import { TrashIcon, PencilSquareIcon, EyeIcon, EyeSlashIcon, PlusCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { AppDialog } from '../component/AppDialog';
import { MemberPage } from '../page/MemberPage';
import { Confirm } from '../component/confirm';


interface Member {
    id: number;
    name: string
    email: string;
    password: string;
    role: string;
}

interface RowProp {
    member: Member;
    whenDelete: (member: Member) => void;
    whenEdit: (member: Member) => void;

}

const MemberRow: FC<RowProp> = ({ member, whenEdit, whenDelete }) => {

    const [showMember, setShowMember] = useState(false)
    return (
        <>
            <tr key={member.id} className='odd:bg-red-100 bg-red-200 hover:bg-red-300'>
                <td>
                    <div className='flex flex-row gap-2  justify-center'>
                        <PencilSquareIcon className='w-5 h-5 text-black hover:text-green-300'
                            onClick={() => whenEdit(member)} />
                        {member.id}
                    </div>

                </td>
                <td className='text-left pl-5'>{member.name}</td>
                <td className='text-left pl-5'>{member.email}</td>
                <td className='text-left pl-5'>
                    <div
                        className='flex flex-row'
                        onMouseOver={() => setShowMember(true)}
                        onMouseOut={() => setShowMember(false)}
                    >
                        {!showMember && (
                            <EyeIcon className="w-4 h-4 text-green-700" onClick={() => setShowMember(true)} />
                        )}

                        {showMember && (
                            <EyeSlashIcon className="w-4 h-4" onClick={() => setShowMember(false)} />
                        )}

                        <div className='cursor-pointer'>{showMember && member.password}</div>
                    </div>
                </td>
                <td>{member.role}</td>
                <td className='flex justify-center flex-row'>
                    <TrashIcon className='w-4 h-4 mt-1 cursor-pointer text-black hover:text-red-700 '
                        onClick={() => whenDelete(member)} />
                </td>
            </tr>
        </>
    );
}

interface toolbarProps {
    whenAdd: () => void;
    whenRefresh: () => void;
}
const MemberToolbar: FC<toolbarProps> = ({ whenAdd, whenRefresh }) => {
    return <>
        <div className='flex flex-row gap-2 bg-blue-300 pb-2 pl-5' >

            <button className='npru-button w-[100px]  rounded' onClick={whenAdd}>
                <div className='flex flex-row gap-2'>
                    <PlusCircleIcon className='w-6 h-6' />
                    <span>Add</span>
                </div>
            </button>

            <button className='npru-button w-[100px]' onClick={whenRefresh}>
                <div className='flex flex-row gap-2'>
                    <ArrowPathIcon className='w-6 h-6' />
                    <span>Refresh</span>
                </div>
            </button>
        </div>
    </>
}

const MemberList: FC = () => {
    //load data component
    useEffect(() => {
        fetchUser();
    }, [])

    /**
     * data state
     */
    const [member, setMember] = useState([])
    const [show, setShow] = useState(false)
    //Confirm dialog
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmTitle, setConfirmTitle] = useState("")
    const [confirmMessage, setConfirmMessage] = useState("")
    //tenpoty for deletemember
    const [currentMember, setCurrentMember] = useState<Member>()

    //temporary edit
    const [id, setId] = useState(0);
    const [isEdit, setIsEdit] = useState(false);

    /**
     * fetch from API
     */
    const fetchUser = async () => {
        const resp = await fetch("/api/auth/user", {
            method: "GET",
            headers: {
                Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
                "Content-Type": "application/json",
            },
        });
        if (resp.status === 200) {
            const data = await resp.json();
            setMember(data);
        }
    }
    /**
     * save success callback
     */
    const saveSuccess = () => {
        setShow(false);
        fetchUser();
    }

    const EditUser = (member: Member) => {
        setId(member.id);
        setIsEdit(true);
        setShow(true);
    }

    const deleteUser = (member: Member) => {
        setConfirmTitle("please confirm to delete")
        setConfirmMessage("Are you sure to " + member.name + " delete ")
        setShowConfirm(true)
        setCurrentMember(member)
    }
    const confirmDelete = async () => {
        const resp = await fetch("/api/auth/user/" + currentMember?.id, {
            method: "DELETE",
            headers: {
                Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
                "Content-Type": "application/json",
            },
        });
        if (resp.status === 200) {
            fetchUser();
        } else {

        }

    }

    const whenAddClick = () => {
        setIsEdit(false);
        setShow(true)
    }

    return (
        <>
            <MemberToolbar whenAdd={whenAddClick} whenRefresh={fetchUser} />

            <div className='border round-md p-4 text-center overflow-auto h-96'>
                <table>
                    <thead className='h-10'>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody >
                        {member.map((m: Member) => (
                            <MemberRow
                                member={m}
                                key={m.id}
                                whenEdit={EditUser}
                                whenDelete={deleteUser}
                            />

                        ))}
                    </tbody>
                </table>
            </div>

            <AppDialog title='Member Page' show={show} setShow={setShow}>
                <MemberPage whenSuccess={saveSuccess} id={id} isEdit={isEdit} />
            </AppDialog>
            <Confirm
                title={confirmTitle}
                message={confirmMessage}
                show={showConfirm}
                setShow={setShowConfirm}
                whenOK={confirmDelete}
            />
        </>
    )
}

export { MemberList }