import React from 'react'
import classNames from 'classnames'
import orderStore from './OrderStore'

export default class BoundInput extends React.Component {

  render() {
    const { id, label, required, placeholder, type, checkboxValue } = this.props
    const value = orderStore[id]

    const containerClass = classNames('form-group', { 'has-error': false})

    if (type === 'checkbox' || type === 'radio') {
      return (
        <div className="form-group">
          <div className="col-sm-9 col-sm-offset-3">
            <div className="checkbox">
              <label>
                <input type={type} value={checkboxValue} name={id} defaultChecked={checkboxValue === value} /> {label}
              </label>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={containerClass}>
        <label htmlFor={id} className="col-sm-3 control-label">{label}</label>
        <div className="col-sm-9">
          <input type={type} className="form-control" id={id} name={id} placeholder={placeholder} required={required} defaultValue={value} />
        </div>
      </div>
    )
  }
}
