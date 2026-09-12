import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <header className='navbar'>
            <Link to='/' className='logo'>
              🛒 FreshCart
            </Link>
            <nav>
                <Link>Home</Link>
                <Link>Categories</Link>
                <Link>Products</Link>
                <Link>Order</Link>
            </nav>
        </header>
    )
}

export default Navbar;