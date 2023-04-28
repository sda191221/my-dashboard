import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaImage, FaCloudSun, FaAngleDoubleRight, FaBars, FaTimes } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import classes from './Sidebar.module.css';
//import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('users');
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Add state variable for sidebar open/closed
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const path = location.pathname;

        if (path === '/signOut') {
            setActiveLink('/signIn')
            navigate('/signIn')
        }
        else {
            setActiveLink(path);
        }
        // eslint-disable-next-line
    }, [location]);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn) {
            setIsLoggedIn(JSON.parse(storedIsLoggedIn));
        }
        // eslint-disable-next-line
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink('/signIn');
        if (link === 'signOut') {

            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', false);
            navigate('/signIn');
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={classes.container}>
            {viewportWidth <= 768 ? (
                <button className={classes.sidebarToggle} onClick={toggleSidebar}>
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            ) : null}
            <nav className={`${classes.sidebar} ${sidebarOpen ? classes.open : ''}`}>
                <div className={classes.sidebarHeader}>
                    <h3>My Dashboard</h3>
                </div>
                <ul className={`${classes.nav} flex-column`}>
                    <li className={classes.navItem}>
                        <Link
                            to="/"
                            className={`${classes.navLink} ${activeLink === '/' ? classes.navLinkActive : ''}`}
                            onClick={() => handleLinkClick('/')}
                        >
                            <FaUser /> Users
                        </Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link
                            to="/gallery"
                            className={`${classes.navLink} ${activeLink === '/gallery' ? classes.navLinkActive : ''}`}
                            onClick={() => handleLinkClick('gallery')}
                        >
                            <FaImage /> Gallery
                        </Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link
                            to="/weather"
                            className={`${classes.navLink} ${activeLink === '/weather' ? classes.navLinkActive : ''}`}
                            onClick={() => handleLinkClick('weather')}
                        >
                            <FaCloudSun /> Weather
                        </Link>
                    </li>

                    <li className={classes.navItem}>
                        {isLoggedIn ? (
                            <Link
                                to="/signOut"
                                className={`${classes.navLink} ${activeLink === '/signOut' ? classes.navLinkActive : ''}`}
                                onClick={() => handleLinkClick('signOut')}
                            >
                                <FaAngleDoubleRight /> Sign Out
                            </Link>
                        ) : (
                            <Link to="/signIn"
                                className={`${classes.navLink} ${activeLink === '/signIn' ? classes.navLinkActive : ''}`}
                                onClick={() => handleLinkClick('signIn')}
                            >
                                <FaAngleDoubleRight /> Sign In
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;