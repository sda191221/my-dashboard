import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaImage, FaCloudSun, FaAngleDoubleRight } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import './Sidebar.css'
const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Add useNavigate hook
    const [activeLink, setActiveLink] = useState('users');
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        const path = location.pathname;

        if (path === '/signOut') {
            setActiveLink('/signIn')
        }
        else {
            setActiveLink(path);
        }
    }, [location]);

    const handleLinkClick = (link) => {
        setActiveLink('/signIn');
        if (link === 'signOut') {

            setIsLoggedIn(false);
            navigate('/signIn'); // Navigate to signIn page
        }
    };
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>My Dashboard</h3>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        to="/"
                        className={`nav-link ${activeLink === '/' ? 'nav-link-active' : ''}`}
                        onClick={() => handleLinkClick('/')}
                    >
                        <FaUser className="mr-2" /> Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/gallery"
                        className={`nav-link ${activeLink === '/gallery' ? 'nav-link-active' : ''}`}
                        onClick={() => handleLinkClick('gallery')}
                    >
                        <FaImage className="mr-2" /> Gallery
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/weather"
                        className={`nav-link ${activeLink === '/weather' ? 'nav-link-active' : ''}`}
                        onClick={() => handleLinkClick('weather')}
                    >
                        <FaCloudSun className="mr-2" /> Weather
                    </Link>
                </li>

                <li className="nav-item">
                    {isLoggedIn ? (
                        <Link
                            to="/signOut"
                            className={`nav-link ${activeLink === '/signOut' ? 'nav-link-active' : ''}`}
                            onClick={() => handleLinkClick('signOut')}
                        >
                            <FaAngleDoubleRight className="mr-2" /> Sign Out
                        </Link>
                    ) : (
                        <Link
                            to="/signIn"
                            className={`nav-link ${activeLink === '/signIn' ? 'nav-link-active' : ''}`}
                            onClick={() => handleLinkClick('signIn')}
                        >
                            <FaAngleDoubleRight className="mr-2" /> Sign In
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;