import React from 'react'
import classNames from 'classnames'
import BoundInput from './BoundInput'

export default class About extends React.Component {

  isValidated = () => {
    return this.refs.form.checkValidity()
  }

  render() {
    return (
      <form ref="form">
        <h3>Údaje o obdarovaném</h3>
        <div className="row">
         <div className="col-lg-6">
           <div className="form-horizontal">
           <BoundInput type="text" id="zajmy" label="Volný čas" placeholder="vaření, fotbal, cestování..." />
           <BoundInput type="text" id="povaha" label="Povaha" placeholder="romantik, extrovert, bavič... " />
           <BoundInput type="text" id="zivotnistyl" label="Životní styl" placeholder="ekolog, pankáč, hipster..." />
           <BoundInput type="text" id="chute" label="Chutě" placeholder="vinař, pivař, vegetarián..." />
           </div>
         </div>
       </div>
     </form>
    );
  }
}
