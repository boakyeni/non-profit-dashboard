'use client'

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center py-2 rounded-tl-3xl">
                <div className="flex-grow ml-3">
                    <input
                        type="text"
                        className="w-1/2 bg-white text-slate-900 px-4 py-2 border rounded-full"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center">Account</div>
            </nav>
        </>
    );
};

export default Navbar;