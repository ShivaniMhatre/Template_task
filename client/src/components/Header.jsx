import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="bg-slate-200">
            <div className="w-full flex justify-around mx-auto p-3 max-w-6xl">
                <Link to="/">
                    <h1 className="font-bold text-sm hover:cursor-pointer sm:text-xl">
                        <span className="text-slate-700">Temp</span>
                        <span className="text-slate-900">late</span>
                    </h1>
                </Link>
                <Link to='/login'>
                <div className="text-slate-700 font-bold underline">Login</div>
                </Link>
            </div>
        </header>
    )
}

export default Header