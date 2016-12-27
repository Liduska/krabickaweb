import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'

const PRICES = [
  { name: 'Radostná', price: 700 },
  { name: 'Sváteční', price: 1000 },
  { name: 'Důležitá', price: 1500 },
  { name: 'Výjimečná', price: 2000 },
  { name: 'VIP', price: 2500 },
  { name: 'Královská', price: 3000 },
]

export default class ChooseBox extends React.Component {

  handlePriceChange = (event) => {
    const price = Number(event.target.value)
    this.props.setValue('price', price)
  }

  render() {
    const { price } = this.props

    return (
      <div>
        <h3>Mám zájem o krabičku</h3>

        <div className="">
          <div className="form-group col-lg-12 price-selector">
            {PRICES.map((p) => <div key={p.price} className="radio">
              <label>
                <input type="radio" value={p.price} name="price" onChange={this.handlePriceChange} checked={price === p.price} /> {p.name} <strong>{p.price} Kč</strong>
              </label>
            </div>)}
          </div>
        </div>

      </div>
    );
  }
}
