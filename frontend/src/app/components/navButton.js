'use client'
const NavButton = ({ children, section }) => {
    const goto = (section) => {
        if (typeof window !== "undefined") {
            document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
            if (section == "first-section") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
    return (
        <button className="" onClick={() => goto(section)}>
            {children}
        </button>
    )
}

export default NavButton