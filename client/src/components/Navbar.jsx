import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';


function Navbar() {
    return (
        <header className='navbar'>
           <div className='navbar-container'>
                <Link to='/' className='logo'>
                  🛒 FreshCart  
                </Link>

                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/categories'>Categories</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/orders'>Orders</Link>
                </nav>

                <div className='navbar-actions'>
                    <Link to='/cart' className='cart-link'>
                       🛒 
                    </Link>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faUserRegular} />
                    </Link>
                </div>
            </div> 
        </header>
    )
}

export default Navbar;