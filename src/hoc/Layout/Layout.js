import React, { useState } from 'react';
import { connect } from 'react-redux'

import Aux from '../Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [sideDrawerVisible, setSideDrawareVisible] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSideDrawareVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawareVisible(!sideDrawerVisible)
    }


    return (
        <Aux>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerVisible}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);