import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurgerLogo" />
    </div>
)

export default Logo