import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'
import BoundInput from './BoundInput'

export default class DeliveryAndPayment extends React.Component {

  handlePaymentTypeChange = (event) => {
    const value = event.target.value
    this.props.setValue('paymentType', value)
  }

  isValidated = () => {
    return this.refs.form.checkValidity()
  }

  render() {
    const { totalPrice, price, deliveryPrice, paymentType, setValue } = this.props

    return (
      <form ref="form">
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
                <input type="radio" value="osobne" name="doprava" onChange={() => setValue('deliveryPrice', 0)} defaultChecked={deliveryPrice === 0} /> Osobní převzetí v Praze <strong>zdarma</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="posta" name="doprava" onChange={() => setValue('deliveryPrice', 99)} defaultChecked={deliveryPrice === 99} /> Přepravní službou Geis <strong>99 Kč</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Další možnosti</h3>
            <BoundInput type="checkbox" id="inkognito" checkboxValue="yes" label="Chci zůstat inkognito" indentLeft={false} />
            <BoundInput type="checkbox" id="schvalit_obsah" checkboxValue="yes" label="Schválit obsah krabičky (doba dodání se může prodloužit)" indentLeft={false} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h3>Fakturační adresa</h3>
            <div className="form-horizontal">
              <BoundInput type="text" id="jmenoprijmeni" label="Celé jméno" required />
              <BoundInput type="text" id="faadresa" label="Adresa" placeholder="Ulice, město, PSČ" />
              <BoundInput type="text" id="telefon" label="Váš telefon" required />
              <BoundInput type="text" id="vasemail" label="Váš e-mail" required />
              <BoundInput type="checkbox" id="odbernl" checkboxValue="yes" label="Pošlete mi sem tam krabičkový newsletter" />
            </div>
          </div>

          <div className="col-lg-6">
            <h3>Doručovací adresa (pokud se liší)</h3>
            <div className="form-horizontal">
              <BoundInput type="text" id="jmenoprijmeni_doruceni" label="Celé jméno" />
              <BoundInput type="text" id="adresa_doruceni" label="Adresa" placeholder="Ulice, město, PSČ" />
              <BoundInput type="text" id="telefon_doruceni" label="Váš telefon" />

            </div>
          </div>
        </div>
      </form>
    );
  }
}
