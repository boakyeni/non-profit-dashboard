'use client'

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center px-4 py-2">
                <div className="flex-grow">
                    <input
                        type="text"
                        className="w-1/2 bg-slate-100 text-slate-900 px-4 py-2 border-b-2"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center">Account</div>
            </nav>
        </>
    );
};

export default Navbar;