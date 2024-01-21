import { FC } from "react";

const HomePage: FC = () => {
    return <>
        <div className="flex w-full h-screen bg-red-700 ">

            <div className="rounded-lg p-5 border border-yellow-300 bg-gray-800  m-auto  sm:w-1/2 md:w-1/3 text-center text-6xl">
                <span className="text-red-200">H</span>
                <span className="text-red-300">O</span>
                <span className="text-red-400">M</span>
                <span className="text-red-500">E</span>
                <span className="text-red-600">P</span>
                <span className="text-red-700">A</span>
                <span className="text-red-800">G</span>
                <span className="text-red-900">E</span>


                <div className="text-3xl text-red-500">NAPHAT LONU</div>
            </div>
        </div>
    </>
}
export { HomePage }