import { observer } from 'mobx-react'
import React from 'react'
import { PRICES } from './constants'
import moment from 'moment'

export default observer(class Summary extends React.Component {

  paymentType = () => {
    switch (this.props.paymentType) {
      case 'ucet':
        return 'Předem na bankovní účet'
      case 'bitcoin':
        return 'Platba bitcoinem'
      case 'paypal':
        return 'Platba PayPalem'
    }
  }

  deliveryType = () => {
    switch (this.props.deliveryPrice) {
      case 0:
        return 'Osobní odběr'
      case 99:
        return 'Přepravní službou Geis'
      case 150:
        return 'Česká pošta - dobírka'
    }
  }

  checkboxText = (value) => {
    return value ? 'Ano' : 'Ne'
  }

  deliveryDate = () => {
    let days
    switch (this.props.paymentType) {
      case 'ucet':
        days = 3
        break
      case 'bitcoin':
      case 'paypal':
        days = 2
        break
    }
    if (this.props.boxOrder) {
      return moment().add(days, 'days').format('D. M. YYYY')
    } else {
      days += 6
      return moment().add(days, 'days').format('D. M. YYYY') + ' - ' + moment().add(days + 2, 'days').format('D. M. YYYY')
    }
  }

  render() {
    const { totalPrice,
            price,
            deliveryPrice,
            paymentType,
            product,
            boxOrder,
            jmenoprijmeni,
            faadresa,
            telefon,
            vasemail,
            odbernl,
            jmenoprijmeni_doruceni,
            adresa_doruceni,
            telefon_doruceni,
            inkognito,
            schvalit_obsah,
            jmeno_pro_koho
    } = this.props

    return (
      <div>
      <div className="row">
        <div className="col-lg-6">
          <h4>POJĎME SI TO SHRNOUT</h4>
          <p>&nbsp;</p>
        </div>
      </div>
        <div className="row">
          <div className="col-lg-6">
            <p>
              <strong>Typ krabičky:</strong> {boxOrder ? product : PRICES.find((p) => p.price === price).name}<br />
              <strong>Krabičku objednává:</strong> {jmenoprijmeni} <br />
              <strong>Pro:</strong> {jmeno_pro_koho} <br />
              <strong>Fakturační adresa:</strong> {faadresa ? `${jmenoprijmeni}, ${faadresa}` : '-'}<br />
              <strong>Doručovací adresa:</strong> {adresa_doruceni ? `${jmenoprijmeni_doruceni}, ${adresa_doruceni}` : '-'}<br />
            </p>
          </div>
          <div className="col-lg-6">
            <p>
              <strong>Způsob platby:</strong> {this.paymentType()} <br />
              <strong>Způsob doručení:</strong> {this.deliveryType()} <br />
              <strong>Krabičkový newsletter:</strong> {this.checkboxText(odbernl)} <br />
              <strong>Zůstat inkognito:</strong> {this.checkboxText(inkognito)} <br />
              {boxOrder ? null : <span><strong>Schválit předem obsah krabičky:</strong> {this.checkboxText(schvalit_obsah)} <br /></span>}
            </p>
          </div>
        </div>

        <p>&nbsp;</p>

        <div className="row">
          <div className="col-lg-6">
            <h4>KOLIK TO BUDE STÁT</h4>
            <p>
              <strong>Cena krabičky</strong> {price}Kč <br />
              <strong>Cena dopravy</strong> {!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Vyplňte způsob dopravy'} <br />
              <strong className="total-price">Celková cena</strong> <span className="total-price">{totalPrice ? `${totalPrice} Kč` : '?'}</span>
            </p>
          </div>

          <div className="col-lg-6">
            <h4>KRABIČKA BUDE K {deliveryPrice === 0 ? 'PŘEVZETÍ' : 'ODESLÁNÍ'}</h4>
            <p>
              { this.deliveryDate() }
            </p>
            <p>
              Čas je pouze orientační. Počkejte, prosíme, na výzvu k odběru nebo informaci o odeslání krabičky.
            </p>
          </div>
        </div>
      </div>
    );
  }
})
