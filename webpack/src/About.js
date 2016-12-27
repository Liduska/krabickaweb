import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import classNames from 'classnames'
import BoundInput from './BoundInput'

export default class About extends React.Component {
  constructor(props) {
    super(props)

  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.props.setValue(name, value)
  }

  isValidated = () => {
    return this.refs.form.checkValidity()
  }

  render() {
    const { price } = this.props

    return (
      <form ref="form" onChange={this.handleChange}>
        <h3>Údaje o obdarovaném</h3>
        <div className="row">
         <div className="col-lg-6">
           <div className="form-horizontal">
             <BoundInput type="text" id="krestnijmeno" label="Křestní jméno" placeholder="Pro koho to bude?" required />
             <BoundInput type="text" id="veb" label="Věk" placeholder="Věk je jen číslo :)" />
           </div>
         </div>
       </div>
     </form>
    );
  }
}
