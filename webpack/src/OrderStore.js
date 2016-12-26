import { autorun, extendObservable, action } from 'mobx'

class OrderStore {

  constructor() {
    autorun(() => console.log(this));

    extendObservable(this, {
      paymentType: 'ucet',
      price: 700,
      deliveryPrice: undefined,
      get totalPrice() {
        const { price, deliveryPrice } = this

        return price + deliveryPrice
      }
    })
  }

  setValue = action((field, value) => {
    this[field] = value
  })

}

const orderStore = new OrderStore()
export default orderStore
