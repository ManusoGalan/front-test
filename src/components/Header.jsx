import { useSelector } from 'react-redux'

const Header = () => {
    const productsCount = useSelector((state) => state.products.count)

    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Navbar</span>
            <span>{productsCount}</span>
        </nav>
    )
}

export default Header;