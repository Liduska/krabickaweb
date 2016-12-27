import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'

const PRICES = [
  { name: 'Radostná', price: 700, description: 'Krabička z drobných radostí může obsahovat např. plecháček, bio kosmetiku, sypaný čaj, vonné svíčky, diář apod. Naše nejlevnější krabička jistě udělá radost komukoliv, komu ji věnujete.' },
  { name: 'Sváteční', price: 1000, description: 'Vybavte svou sestru nebo přítelkyni stylovou plátěnou taškou nebo třeba ručně vyrobenými náušnicemi! Tahle sváteční krabička je pro ženy jako stvořená.' },
  { name: 'Důležitá', price: 1500, description: 'Vše důležité pro důležité. Po otevření krabičky na Vás vykoukne např. nový vázací motýlek, otvírák na víno anebo skleněný termohrnek. Zkrátka samé důležité věci!' },
  { name: 'Výjimečná', price: 2000, description: 'Najít dárek k výročí je stejně náročné jako výšlap na Mount Everest. Nebo ne? Výjimečná krabička Vám to usnadní a nabídne vše možné od parfémů po karafu na víno.' },
  { name: 'VIP', price: 2500, description: 'Psaníčko na párty pro městskou kočku nebo ručně šitý pléd pro hřejivé večery. Nejen to si zaslouží každá VIP osoba ve Vašem životě. Obsah krabičky je zkrátka dokonale rozmazlí.' },
  { name: 'Královská', price: 3000, description: 'Pro opravdu důležité momenty. Královská krabička nabídne luxusní kosmetiku i produkty z pravé kůže. Vždyť nejde jen o originalitu, ale také kvalitu. ' },
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
        <h4>TYP KRABIČKY</h4>
        <p>&nbsp;</p>
        <div className="box-list">
            {PRICES.map((p) =>
            <div className="box">
              <div key={p.price} className="radio">
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
