import { Component } from "react"

import Button from "../../../components/UI/Button/Button"
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.moule.css'
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        alert('You continue')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            // Price should be calculated on server side
            price: this.props.price,
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
                this.setState({ loading: false });
                this.props.history('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>

                {form}
            </div>
        )
    }
}

export default ContactData