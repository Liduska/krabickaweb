import { observer } from 'mobx-react'
import React from 'react'

export default observer(class Summary extends React.Component {

  render() {
    const { totalPrice, price, deliveryPrice, paymentType, jmenoprijmeni } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-lg-6">
            Jmeno: {jmenoprijmeni}
          </div>
        </div>
        <div className="row">
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
})
