import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const productsCount = useSelector((state) => state.products.count)
    const currentLocation = useLocation()

    console.log(currentLocation)

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand mb-0 h1" to="/">
                    Navbar
                </Link>
                <Link className="cart position-relative d-inline-flex" to="#">
                    <i className="bi bi-bag"></i>
                    <span className="cart-basket d-flex align-items-center justify-content-center">
                        {productsCount}
                    </span>
                </Link>
            </nav>

            <div className="container mt-4">
                <nav aria-label="breadcrumb mt-4">
                    <ol className="breadcrumb">
                    {
                            [...new Set(currentLocation.pathname.split('/'))].map((locationPart, index, locationParts) => {
                                switch (locationPart) {
                                    case "":
                                        return locationParts.length === index + 1 ? <li className="breadcrumb-item active" aria-current="page"><i class="bi bi-house-fill"></i></li> : <li class="breadcrumb-item"><Link to={"/"}><i class="bi bi-house-fill"></i></Link></li>
                                    default:
                                        const currentItem = JSON.parse(localStorage.getItem(locationPart));
                                        return <li className="breadcrumb-item active" aria-current="page">{`${currentItem.brand} ${currentItem.model}`}</li>
                                }
                            })
                        }
                    </ol>
                </nav>
            </div>
        </>
    )
}

export default Header;