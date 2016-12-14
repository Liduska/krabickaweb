import React from 'react'
import InputRange from 'react-input-range'
import classNames from 'classnames'

const MAX_VALUE = 3000
const MIN_VALUE = 650

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: 650,
      value: 650,
      voucher: '',
      paymentType: 'ucet'
    };
    this.state.price = this.calculatePrice(this.state.value)
    this.validate()
  }

  calculatePrice(value) {
    const ratio = value < 1000 ? 1.30 : 1.25
    return value * ratio
  }

  calculateTotalPrice() {
    const { price, deliveryPrice } = this.state

    this.setState({
      totalPrice: price + deliveryPrice
    }, this.validate)
  }

  updateValueAndPrice(value) {
    const price = Math.round(this.calculatePrice(value))
    this.setState({
      value: value,
      price: price
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
    }, this.calculateTotalPrice)
  }

  handlePaymentTypeChange = (event) => {
    const value = event.target.value
    console.log(value);
    this.setState({
      paymentType: value
    })
  }

  validate = () => {
    const submitButton = $('button[type=submit]')
    submitButton.prop('disabled', !this.state.totalPrice)
  }

  render() {
    const { userInput, value, price, deliveryPrice, totalPrice, paymentType, name } = this.state
    const valueInputClassNames = classNames('form-group', { 'has-error':  userInput !== value })

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
            <input type="number" className="form-control" name="hodnota_krabicky" value={this.state.userInput} onChange={this.handleInputChange} />
            &nbsp; Kč
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
              <dt>Za dárky</dt>
              <dd>{this.state.price} Kč</dd>
              <dt>Za dopravu</dt>
              <dd>{!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Vyplňte způsob dopravy'}</dd>
              <dt className="total-price"><strong>Celková cena</strong></dt>
              <dd className="total-price">{totalPrice ? `${totalPrice} Kč` : '?'}</dd>
            </dl>
          </div>
        </div>
        <input type="hidden" name="cena_pred_slevou" value={this.state.price} />
        <input type="hidden" name="cena_dopravy" value={this.state.deliveryPrice} />
        <input type="hidden" name="celkova_cena" value={this.state.totalPrice} />
        <input type="hidden" name="_next" value={`http://krabickanamiru.cz/jupi.html?paymentType=${paymentType}&amount=${totalPrice}`} />
      </div>
    );
  }
}
