import React from 'react'
import classNames from 'classnames'
import BoundInput from './BoundInput'
import BoundSelect from './BoundSelect'

export default class About extends React.Component {

  isValidated = () => {
    return this.refs.form.checkValidity()
  }

  render() {
    return (
      <form ref="form">
        <h4>PRO KOHO TO BUDE</h4>
        <p>&nbsp;</p>
        <div className="row">
          <div className="col-lg-8">
            <div className="form-horizontal">
              <BoundInput type="text" id="jmeno_pro_koho" label="Krabička je pro" required />
              <BoundSelect id="vek" label="Věk" options={['', 'méně než 18', '18 - 25', '25 - 30', '30 - 35', '35 - 45', '45 - 55', 'více než 55']} required />
              <BoundSelect id="pohlavi" label="Pohlaví" options={['', 'Muž', 'Žena']} required />
              <BoundInput type="text" id="zajmy" label="Volný čas" placeholder="vaření, fotbal, cestování..." />
              <BoundInput type="text" id="povaha" label="Povaha" placeholder="romantik, extrovert, bavič... " />
              <BoundInput type="text" id="zivotnistyl" label="Životní styl" placeholder="ekolog, pankáč, hipster..." />
              <BoundInput type="text" id="chute" label="Chutě" placeholder="vinař, pivař, vegetarián..." />
              <BoundInput type="textarea" id="popis_od_zakaznika" label="Řekněte nám víc" />
              <span className="help-block col-sm-offset-3">Na co jsme se zapomněli zeptat a měli bychom vědět? Podělte se s námi o veselou historku, zlozvyk i věci, které na ní/na něm máte nejraději. Dárky v krabičce tak můžeme vybrat ještě lépe.</span>
            </div>
          </div>
       </div>
     </form>
    );
  }
}
