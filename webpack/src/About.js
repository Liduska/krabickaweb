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

  render() {
    const { price } = this.props

    return (
      <form onChange={this.handleChange}>
        <h3>O obdarovanem</h3>
        <div className="row">
         <div className="col-lg-6">
           <div className="form-horizontal">
             <div className="form-group">
               <label htmlFor="krestnijmeno" className="col-sm-3 control-label">Křestní jméno</label>
               <div className="col-sm-9">
                 <BoundInput type="text" className="form-control" id="krestnijmeno" name="krestnijmeno" placeholder="Pro koho to bude?" required />
               </div>
             </div>
             <div className="form-group">
               <label htmlFor="vek" className="col-sm-3 control-label">Věk</label>
               <div className="col-sm-9">
                 <BoundInput type="text" className="form-control" id="vek" name="vek" placeholder="Věk je jen číslo :)" />
               </div>
             </div>
           </div>
         </div>
       </div>
     </form>
    );
  }
}
