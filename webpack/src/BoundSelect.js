import React from 'react'
import classNames from 'classnames'
import orderStore from './OrderStore'

export default class BoundSelect extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isValid: false
    }
  }

  handleChange = (event) => {
    const { id } = this.props
    const { value } = event.target
    orderStore.setValue(id, value)
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
    const { id, label, required, options } = this.props
    const value = orderStore.order[id]

    const containerClass = classNames('form-group form-group-sm', { 'has-error': !this.state.isValid })

    return (
      <div className={containerClass}>
        <label htmlFor={id} className="col-sm-3 control-label">{label}</label>
        <div className="col-sm-9">
          <select id={id} ref="input" name={name} required={required} value={value} className="form-control" onChange={this.handleChange}>
            {options.map(option =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
        </div>
      </div>
    )
  }
}
