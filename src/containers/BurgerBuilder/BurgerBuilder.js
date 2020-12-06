import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxilary';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummay/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import axios from '../../axios-orders'

export const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.5,
    meat: 2,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchasable: false,
        totalPrice: 2,
        purchasing: false,
        loading: false,
        error : false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-b694d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error : true})
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddion = INGREDIENT_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddion
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert('You continue')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            // Price should be calculated on server side
            price: this.state.totalPrice,
            customer: {
                name: 'Bastien Dumont',
                address: {
                    street: 'Teststreet',
                    zipCode: '69000',
                    country: 'France'
                },
                email: 'tset@test.com'
            },
            deliveryMethod: 'fast'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}
                    /></Aux>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);