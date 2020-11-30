import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import { INGREDIENT_PRICE } from '../../../containers/BurgerBuilder/BurgerBuilder'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            const { label, type } = ctrl;
            return <BuildControl
                key={label}
                label={label}
                added={() => props.ingredientAdded(type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[type]}
                unitPrice={INGREDIENT_PRICE[type]}
            />
        })}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
        >ORDER NOW</button>
    </div>
)

export default BuildControls