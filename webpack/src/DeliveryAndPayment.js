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
    const { totalPrice, price, deliveryPrice, paymentType, boxOrder, setValue } = this.props

    return (
      <form ref="form">
        <div className="row">
          <div className="col-lg-4">
            <h4>ZPŮSOB PLATBY</h4>
            <div className="checkbox">
              <label>
                <input type="radio" value="ucet" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'ucet'} required /> Předem na bankovní účet <strong>1-2 dny</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="bitcoin" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'bitcoin'} required /> Platba bitcoinem <strong>ihned</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="paypal" name="platba" onChange={this.handlePaymentTypeChange} checked={paymentType === 'paypal'} required /> PayPal <strong>ihned</strong>
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <h4>DORUČENÍ</h4>
            <div className="checkbox">
              <label>
                <input type="radio" value="osobne" name="doprava" onChange={() => setValue('deliveryPrice', 0)} defaultChecked={deliveryPrice === 0} required /> Osobní převzetí v Praze <strong>zdarma</strong>
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="radio" value="kuryr" name="doprava" onChange={() => setValue('deliveryPrice', 99)} defaultChecked={deliveryPrice === 99} required /> Přepravní službou Geis (ČR) <strong>99 Kč</strong>
              </label>
            </div>
            {
              boxOrder ?
                <div className="checkbox">
                  <label>
                    <input type="radio" value="posta_dobirka" name="doprava" onChange={() => setValue('deliveryPrice', 150)} defaultChecked={deliveryPrice === 150} required /> Česká pošta - dobírka (ČR) <strong>150 Kč</strong>
                  </label>
                </div>
              :
              null
            }
          </div>
          <div className="col-lg-4">
            <h4>MOŽNOSTI OBJEDNÁVKY</h4>
            <BoundInput type="checkbox" id="inkognito" label="Chci zůstat inkognito" indentLeft={false} />
            {
              boxOrder ? null : <BoundInput type="checkbox" id="schvalit_obsah" label="Schválit obsah krabičky před odesláním" indentLeft={false} />
            }
          </div>
        </div>
        <p>&nbsp;</p>
        <div className="row">
          <div className="col-lg-6">
            <h4>FAKTURAČNÍ ADRESA</h4>
            <div className="form-horizontal">
              <BoundInput type="text" id="jmenoprijmeni" label="Celé jméno" required />
              <BoundInput type="text" id="faadresa" label="Adresa" placeholder="Ulice, město, PSČ" />
              <BoundInput type="text" id="telefon" label="Váš telefon" required />
              <BoundInput type="text" id="vasemail" label="Váš e-mail" required />
              <BoundInput type="checkbox" id="odbernl" label="Chci dostávat 1x měsíčně krabičkový newsletter." />
            </div>
          </div>

          <div className="col-lg-6">
            <h4>DORUČOVACÍ ADRESA</h4>
            <div className="form-horizontal">
              <BoundInput type="text" id="jmenoprijmeni_doruceni" label="Celé jméno" />
              <BoundInput type="text" id="adresa_doruceni" label="Adresa" placeholder="Ulice, město, PSČ" />
              <BoundInput type="text" id="telefon_doruceni" label="Váš telefon" />
              <BoundInput type="textarea" id="vzkaz" label="Vzkaz pro adresáta" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
