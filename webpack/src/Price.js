import React from 'react'
import classNames from 'classnames'

const PRICES = [
  { name: 'Radostná', price: 700 },
  { name: 'Sváteční', price: 1000 },
  { name: 'Důležitá', price: 1500 },
  { name: 'Výjimečná', price: 2000 },
  { name: 'VIP', price: 2500 },
  { name: 'Královská', price: 3000 },
]

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 700,
      paymentType: 'ucet'
    };
    this.validate()
  }

  calculateTotalPrice() {
    const { price, deliveryPrice } = this.state

    this.setState({
      totalPrice: price + deliveryPrice
    }, this.validate)
  }

  handlePriceChange = (event) => {
    const price = Number(event.target.value)
    this.setState({
      price: price
    }, this.calculateTotalPrice);
  }

  handleDeliveryChange = (price) => {
    this.setState({
      deliveryPrice: price
    }, this.calculateTotalPrice)
  }

  handlePaymentTypeChange = (event) => {
    const value = event.target.value
    this.setState({
      paymentType: value
    })
  }

  validate = () => {
    const submitButton = $('button[type=submit]')
    submitButton.prop('disabled', !this.state.totalPrice)
  }

  render() {
    const { price, deliveryPrice, totalPrice, paymentType, name } = this.state

    return (
      <div>
        <h3>Mám zájem o krabičku</h3>
        <div className="form-inline">
          <div className="form-group col-lg-12 price-selector">
            {PRICES.map((p) => <div key={p.price} className="radio-inline">
              <label>
                <input type="radio" value={p.price} name="price" onChange={this.handlePriceChange} checked={price === p.price} /> {p.name} <strong>{p.price} Kč</strong>
              </label>
            </div>)}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <h3>Způsob platby</h3>
            <div className="checkbox">
              <label>
                <input type="radio" value="ucet" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'ucet'} /> Předem na bankovní účet <strong>1-2 dny</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="bitcoin" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'bitcoin'} /> Chci platit bitcoinem <strong>ihned</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="paypal" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'paypal'} /> PayPal <strong>ihned</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Doručení</h3>
            <div className="checkbox">
              <label>
                <input type="radio" value="osobne" name="doprava" onChange={() => this.handleDeliveryChange(0)} /> Osobní převzetí v Praze <strong>zdarma</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="posta" name="doprava" onChange={() => this.handleDeliveryChange(99)} /> Přepravní službou Geis <strong>99 Kč</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Cena</h3>
            <dl className="dl-horizontal">
              <dt>Za krabičku</dt>
              <dd>{this.state.price} Kč</dd>
              <dt>Za dopravu</dt>
              <dd>{!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Vyplňte způsob dopravy'}</dd>
              <dt className="total-price"><strong>Celková cena</strong></dt>
              <dd className="total-price">{totalPrice ? `${totalPrice} Kč` : '?'}</dd>
            </dl>
          </div>
        </div>
        <input type="hidden" name="cena_krabicky" value={this.state.price} />
        <input type="hidden" name="cena_dopravy" value={this.state.deliveryPrice} />
        <input type="hidden" name="celkova_cena" value={this.state.totalPrice} />
        <input type="hidden" name="_next" value={`http://krabickanamiru.cz/jupi.html?paymentType=${paymentType}&amount=${totalPrice}`} />
      </div>
    );
  }
}
