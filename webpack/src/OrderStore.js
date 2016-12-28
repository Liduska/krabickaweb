import { autorun, observable, action, toJS } from 'mobx'

class OrderStore {

  constructor() {
    let initialData = {
      step: 0,
      paymentType: 'ucet',
      price: 700,
      deliveryPrice: null,
      zajmy: null,
      povaha: null,
      zivotnistyl: null
    }

    try {
      let persistedData = JSON.parse(sessionStorage.getItem('order'))
      initialData = {
        ...initialData,
        ...persistedData
      }
      console.log('loading', initialData);
    } catch (e) {

    }

    this.order = observable({
      ...initialData,
      get totalPrice() {
        const { price, deliveryPrice } = this.order || {}

        return price + deliveryPrice
      }
    })

    autorun(() => {
      const order = toJS(this.order)
      sessionStorage.setItem('order', JSON.stringify(order))
      console.log('persisting', order)
    })

  }

  setValue = action((field, value) => {
    this.order[field] = value
  })

}

const orderStore = new OrderStore()
export default orderStore
