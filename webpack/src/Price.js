import React from 'react'
import InputRange from 'react-input-range'
import classNames from 'classnames'

const MAX_VALUE = 2000
const MIN_VALUE = 500

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: 500,
      value: 500,
      voucher: ''
    };
    this.state.price = this.calculatePrice(this.state.value)
    this.state.priceAfterDiscount = this.state.price
    this.validate()
  }

  calculatePrice(value) {
    const ratio = value < 1000 ? 1.30 : 1.25
    return value * ratio
  }

  calculateDiscount = () => {
    switch (this.state.voucher) {
      case 'prvnikrabicka':
        return 1 - 0.15
        break
      default:
        return 1
    }
  }

  calculateTotalPrice() {
    const { priceAfterDiscount, deliveryPrice } = this.state

    this.setState({
      totalPrice: priceAfterDiscount + deliveryPrice
    }, this.validate)
  }

  updateValueAndPrice(value) {
    const price = Math.round(this.calculatePrice(value))
    const discount = this.calculateDiscount()
    this.setState({
      value: value,
      price: price,
      priceAfterDiscount: Math.round(price * discount),
      hasDiscount: discount !== 1
    }, this.calculateTotalPrice);
  }

  handleValueChange = (component, value) => {
    this.setState({
      userInput: value
    });
    this.updateValueAndPrice(value)
  }

  handleInputChange = (event) => {
    const value = event.target.value
    this.setState({
      userInput: value
    })
    if (value > MAX_VALUE || value < MIN_VALUE) return
    this.updateValueAndPrice(value)
  }

  handleDeliveryChange = (price) => {
    this.setState({
      deliveryPrice: price
    }, this.calculateTotalPrice);
  }

  handleVoucherChange = (event) => {
    const value = event.target.value
    this.setState({
      voucher: value
    }, () => this.updateValueAndPrice(this.state.value));
  }

  validate = () => {
    const submitButton = $('button[type=submit]')
    submitButton.prop('disabled', !this.state.totalPrice)
  }

  render() {
    const { userInput, value, price, priceAfterDiscount, hasDiscount, deliveryPrice, totalPrice } = this.state
    const valueInputClassNames = classNames('form-group', { 'has-error':  userInput !== value })
    const voucherInputClassNames = classNames('form-group', { 'has-success has-feedback':  hasDiscount })

    return (
      <div>
        <h3>Dárky v hodnotě</h3>
        <div className="form-inline">
          <div className="form-group col-lg-4 col-lg-offset-3">
            <InputRange
              maxValue={MAX_VALUE}
              minValue={MIN_VALUE}
              step={50}
              value={this.state.value}
              onChange={this.handleValueChange}
            />
          </div>
          &nbsp;
          <div className={valueInputClassNames}>
            <input type="number" className="form-control" name="content_value" value={this.state.userInput} onChange={this.handleInputChange} />
            &nbsp; Kč
          </div>
          <input type="hidden" name="price" value={this.state.price} />
        </div>

        <div className="row">
          <div className="col-lg-4">
            <h3>Platba</h3>
            <div className="checkbox">
              <label>
                <input type="radio" value="ucet" name="platba" checked /> Předem na bankovní účet
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="bitcoin" name="platba" /> Chci platit bitcoinem
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Doručení</h3>
            <div className="checkbox">
              <label>
                <input type="radio" value="osobne" name="doprava" onChange={() => this.handleDeliveryChange(0)} /> Osobní převzetí, Praha 9 - Prosek <strong>zdarma</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="kuryr" name="doprava" onChange={() => this.handleDeliveryChange(39)} /> Doručení po Praze <strong>39 Kč</strong>
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
            <div className="form-inline">
              <div className={voucherInputClassNames}>
                <label htmlFor="voucher">Slevový kód</label>
                &nbsp;
                <input id="voucher" type="text" className="form-control" name="voucher_code" value={this.state.voucher} onChange={this.handleVoucherChange} />
                {hasDiscount ? <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span> : ''}
              </div>
            </div>
            <dl className="dl-horizontal">
              <dt>Cena krabičky</dt>
              <dd>{this.state.price} Kč</dd>
              <dt>Cena po slevě</dt>
              <dd>{!isNaN(priceAfterDiscount) ? `${priceAfterDiscount} Kč` : 'Ještě nevíme'}</dd>
              <dt>Cena dopravy</dt>
              <dd>{!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Ještě nevíme'}</dd>
              <dt className="total-price"><strong>Celková cena</strong></dt>
              <dd className="total-price">{totalPrice ? `${totalPrice} Kč` : 'Ještě nevíme'}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
