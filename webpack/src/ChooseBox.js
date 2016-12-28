import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'
import { PRICES } from './constants'

export default class ChooseBox extends React.Component {

  handlePriceChange = (event) => {
    const price = Number(event.target.value)
    this.props.setValue('price', price)
  }

  render() {
    const { price } = this.props

    return (
      <div>
        <h4>TYP KRABIČKY</h4>
        <p>&nbsp;</p>
        <div className="box-list">
            {PRICES.map((p) =>
            <div key={p.price} className="box">
              <div className="radio">
              <h4> {p.name} </h4>
              <p> {p.description} </p>
              <label>
                <input type="radio" value={p.price} name="price" onChange={this.handlePriceChange} checked={price === p.price} /><strong>{p.price} Kč</strong>
              </label>
              </div>
            </div>)}
        </div>

      </div>
    );
  }
}
