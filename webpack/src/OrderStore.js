import { autorun, observable, extendObservable, action, toJS } from 'mobx'

class OrderStore {

  constructor() {
    let initialData = {
      step: 0,
      boxOrder: false,
      price: 700,
      paymentType: 'paypal',
      deliveryPrice: 99,
      product: null,
      productDescription: null,
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

  submitOrder = action(() => {
    const order = {
      ...toJS(this.order),
      _subject: 'Nová objednávka Krabička na míru!',
      totalPrice: this.order.totalPrice
    }

    $.ajax({
      url: 'https://formspree.io/ahoj@krabickanamiru.cz',
      method: 'POST',
      data: order,
      dataType: 'json'
    }).done(() => {
      sessionStorage.removeItem('order')
      window.location.href = `/jupi.html?paymentType=${order.paymentType}&amount=${order.totalPrice}`
    }).fail(() => {
      alert('Při odesílání objednávky došlo k chybě. Zkuste to prosím znovu.')
    })
  })

  userSelectedBox = action(() => {
    let boxOrder
    try {
      boxOrder = JSON.parse(sessionStorage.getItem('boxOrder'))
      sessionStorage.removeItem('boxOrder')
      console.log('loading boxOrder', boxOrder);
    } catch (e) {

    }

    if (boxOrder) {
      this.order.step = 0
      this.order.boxOrder = true
      this.order.product = boxOrder.product
      this.order.productDescription = boxOrder.productDescription
      this.order.price = boxOrder.price
    }
  })

  cancelUserSelectedBox = action(() => {
    this.order.boxOrder = false
    this.order.product = null
    this.order.productDescription = null
    this.order.price = null
  })

}

const orderStore = new OrderStore()
export default orderStore
