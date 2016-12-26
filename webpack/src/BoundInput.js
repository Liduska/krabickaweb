import { computed, intercept, observe, observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import orderStore from './OrderStore'

export default class BoundInput extends React.Component {

  render() {
    const value = orderStore[this.props.name]

    return (
      <input {...this.props} defaultValue={value} />
    )
  }
}
