import classes from './Button.module.css'

const Button = (props) => (
    <button
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}</button>
)

export default Button