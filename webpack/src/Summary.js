import { observer } from 'mobx-react'
import React from 'react'

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
    }
  }

  checkboxText = (value) => {
    return value === 'yes' ? 'Ano' : 'Ne'
  }

  render() {
    const { totalPrice, price, deliveryPrice, paymentType, jmenoprijmeni, faadresa, telefon, vasemail, odbernl, jmenoprijmeni_doruceni, adresa_doruceni, telefon_doruceni, inkognito, schvalit_obsah, jmeno_pro_koho } = this.props

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
            <strong>Typ krabičky:</strong> <br />
            <strong>Krabičku objednává:</strong> {jmenoprijmeni} <br />
            <strong>Pro:</strong> {jmeno_pro_koho} <br />
            <strong>Fakturační adresa:</strong> {jmenoprijmeni}{faadresa ? `, ${faadresa}` : ''} <br />
            <strong>Doručovací adresa:</strong> {jmenoprijmeni_doruceni}{adresa_doruceni ? `, ${adresa_doruceni}` : ''} <br />
          </div>
          <div className="col-lg-6">
            <strong>Způsob platby:</strong> {this.paymentType()} <br />
            <strong>Způsob doručení:</strong> {this.deliveryType()} <br />
            <strong>Krabičkový newsletter:</strong> {this.checkboxText(odbernl)} <br />
            <strong>Zůstat inkognito:</strong> {this.checkboxText(inkognito)} <br />
            <strong>Schválit předem obsah krabičky:</strong> {this.checkboxText(schvalit_obsah)} <br />
          </div>
        </div>

        <p>&nbsp;</p>

        <div className="row">
          <div className="col-lg-4">
            <h4>CENY PŘEHLEDNĚ</h4>
              <strong>Cena krabičky</strong> {price}Kč <br />
              <strong>Cena dopravy</strong> {!isNaN(deliveryPrice) ? `${deliveryPrice} Kč` : 'Vyplňte způsob dopravy'} <br />
              <strong className="total-price">Celková cena</strong> <span className="total-price">{totalPrice ? `${totalPrice} Kč` : '?'}</span>
          </div>
        </div>
      </div>
    );
  }
})
