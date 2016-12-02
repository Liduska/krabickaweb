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
      deliveryPrice: 0
    };
    this.state.price = this.calculatePrice(this.state.value)
  }

  calculatePrice(value) {
    const ratio = value < 1000 ? 1.30 : 1.25
    return value * ratio
  }

  calculateTotalPrice() {
    const { price, deliveryPrice } = this.state

    this.setState({
      totalPrice: price + deliveryPrice
    })
  }

  handleValueChange = (component, value) => {
    this.setState({
      value: value,
      userInput: value,
      price: Math.round(this.calculatePrice(value))
    });
    this.calculateTotalPrice()
  }

  handleInputChange = (event) => {
    const value = event.target.value
    this.setState({
      userInput: value
    })
    if (value > MAX_VALUE || value < MIN_VALUE) return
    this.setState({
      value: value,
      price: Math.round(this.calculatePrice(value))
    });
    this.calculateTotalPrice()
  }

  handleDeliveryChange = (price) => {
    this.setState({
      deliveryPrice: price
    });
    this.calculateTotalPrice()
  }

  render() {
    const { userInput, value, price } = this.state
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
            <input type="number" className="form-control" name="content_value" value={this.state.userInput} onChange={this.handleInputChange} />
            &nbsp; Kč
          </div>
          <input type="hidden" name="price" value={this.state.price} />
        </div>

        <div className="row">
          <div className="col-lg-4">
            <h3>Platba</h3>
            <div className="checkbox disabled">
              <label>
                <input type="radio" value="ucet" name="platba" checked disabled /> Předem na bankovní účet
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
                <input type="radio" value="posta" name="doprava" onChange={() => this.handleDeliveryChange(99)} /> Českou poštou <strong>99 Kč</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Cena</h3>
            <dl className="dl-horizontal">
              <dt>Cena krabičky</dt>
              <dd>{this.state.price} Kč</dd>
              <dt>Cena dopravy</dt>
              <dd>{this.state.deliveryPrice} Kč</dd>
              <dt className="total-price"><strong>Celková cena</strong></dt>
              <dd className="total-price">{this.state.totalPrice} Kč</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
