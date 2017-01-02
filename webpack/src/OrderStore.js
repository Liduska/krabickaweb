import { autorun, observable, extendObservable, action, toJS } from 'mobx'

class OrderStore {

  constructor() {
    let initialData = {
      step: 0,
      price: 700,
      paymentType: 'paypal',
      deliveryPrice: 99,
      zajmy: null,
      povaha: null,
      zivotnistyl: null,
      inkognito: null,
      schvalit_obsah: null,
      jmenoprijmeni: null,
      faadresa: null,
      telefon: null,
      vasemail: null,
      odbernl: null,
      jmenoprijmeni_doruceni: null,
      adresa_doruceni: null,
      telefon_doruceni: null,
      jmeno_pro_koho: null,
      vek: null,
      vzkaz: null,
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
        ...initialData
    })

    extendObservable(this.order, {
      get totalPrice() {
        const { price, deliveryPrice } = this
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
