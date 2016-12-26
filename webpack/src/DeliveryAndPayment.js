import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'

export default class DeliveryAndPayment extends React.Component {

  handlePaymentTypeChange = (event) => {
    const value = event.target.value
    this.props.setValue('paymentType', value)
  }

  render() {
    const { totalPrice, price, deliveryPrice, paymentType, setValue } = this.props

    return (
      <div>
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
                <input type="radio" value="osobne" name="doprava" onChange={() => setValue('deliveryPrice', 0)} /> Osobní převzetí v Praze <strong>zdarma</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="posta" name="doprava" onChange={() => setValue('deliveryPrice', 99)} /> Přepravní službou Geis <strong>99 Kč</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Cena</h3>
            <dl className="dl-horizontal">
              <dt>Za krabičku</dt>
              <dd>{price} Kč</dd>
              <dt>Za dopravu</dt>
              <dd>{!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Vyplňte způsob dopravy'}</dd>
              <dt className="total-price"><strong>Celková cena</strong></dt>
              <dd className="total-price">{totalPrice ? `${totalPrice} Kč` : '?'}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
