import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <NavLink
            className={classes.Logo}
            to='/'>
            <Logo />
        </NavLink>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;