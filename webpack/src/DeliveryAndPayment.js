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
        <div className="row">
          <div className="col-lg-6">
            <h3>Fakturační adresa</h3>
            <div className="form-horizontal">
              <BoundInput type="text" id="jmenoprijmeni" label="Celé jméno" required />
              <div className="form-group">
                <label htmlFor="faadresa" className="col-sm-3 control-label">Adresa</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="faadresa" name="faadresa" placeholder="Ulice, město, PSČ" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="telefon" className="col-sm-3 control-label">Váš telefon</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="telefon" name="telefon" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="vasemail" className="col-sm-3 control-label">Váš e-mail</label>
                <div className="col-sm-9">
                  <input type="email" className="form-control" id="vasemail" name="vasemail" required />
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="yes" name="odbernl" /> Chci dostávat max. 1x měsíčně Krabičkový newsletter.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3>Doručovací adresa (vyplňte, pokud se liší)</h3>
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="jmenoprijmeni" className="col-sm-3 control-label">Celé jméno</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="jmenoprijmeni" name="jmenoprijmeni" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="faadresa" className="col-sm-3 control-label">Fakturační adresa</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="faadresa" name="faadresa" placeholder="Ulice, město, PSČ" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="telefon" className="col-sm-3 control-label">Váš telefon</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="telefon" name="telefon" />
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="yes" name="stejnaadresa" /> Adresa je stejná jako fakturační
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="yes" name="stejnaadresa" /> Schválit obsah krabičky (doba dodání se může prodloužit)
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value="yes" name="stejnaadresa" /> Chci zůstat inkognito
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
