import React from 'react'
import classNames from 'classnames'
import orderStore from './OrderStore'

export default class BoundInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isValid: false
    }
  }

  static defaultProps = {
    indentLeft: true
  }

  handleChange = (event) => {
    let { name, value } = event.target
    const { type } = this.props

    if (type === 'checkbox') {
      value = event.target.checked
    }
    orderStore.setValue(name, value)
    this.validate()
  }

  validate = () => {
    const { input } = this.refs

    this.setState({
      isValid: input && input.checkValidity()
    })
  }

  componentDidMount() {
    this.validate()
  }

  render() {
    const { id, label, required, placeholder, type, indentLeft } = this.props
    const value = orderStore.order[id]

    const containerClass = classNames('form-group form-group-sm', { 'has-error': !this.state.isValid })
    const colDefinitions = classNames({ 'col-sm-9 col-sm-offset-3': indentLeft })

    if (type === 'checkbox') {
      return (
        <div className="form-group form-group-sm">
          <div className={colDefinitions}>
            <div className="checkbox">
              <label>
                <input type={type} ref="input" onChange={this.handleChange} name={id} checked={value} /> {label}
              </label>
            </div>
          </div>
        </div>
      )
    }

    if (type === 'textarea') {
      return (
        <div className={containerClass}>
          <label htmlFor={id} className="col-sm-3 control-label">{label}</label>
          <div className="col-sm-9">
            <textarea ref="input" className="form-control" id={id} name={id} placeholder={placeholder} required={required} value={value} onChange={this.handleChange} />
          </div>
        </div>
      )
    }

    return (
      <div className={containerClass}>
        <label htmlFor={id} className="col-sm-3 control-label">{label}</label>
        <div className="col-sm-9">
          <input type={type} ref="input" className="form-control" id={id} name={id} placeholder={placeholder} required={required} value={value} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}
