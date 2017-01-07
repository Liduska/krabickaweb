import { observer } from 'mobx-react'
import React from 'react'
import StepZilla from './StepZilla'
import ChooseBox from './ChooseBox'
import About from './About'
import DeliveryAndPayment from './DeliveryAndPayment'
import Summary from './Summary'
import SelectedBox from './SelectedBox'

export default observer(class Order extends React.Component {

  onStepChange = (step) => {
    this.props.store.setValue('step', step)
  }

  onSubmit = () => {
    this.props.store.submitOrder()
  }

  steps = (store) => {
    const { order : { totalPrice, price, deliveryPrice, paymentType, product, productDescription, boxOrder }, setValue, cancelUserSelectedBox } = store

    const customBoxSteps =
    [
      {name: 'Výběr krabičky', component: <ChooseBox price={price} setValue={setValue} />},
      {name: 'Bližší informace', component: <About setValue={setValue} />}
    ]

    const boxOrderSteps =
    [
      {name: 'Vybraný produkt', component: <SelectedBox product={product} price={price} productDescription={productDescription} cancelUserSelectedBox={cancelUserSelectedBox} />}
    ]

    const commonSteps =
    [

      {name: 'Platba a doručení', component: <DeliveryAndPayment totalPrice={totalPrice}
                          price={price}
                          deliveryPrice={deliveryPrice}
                          paymentType={paymentType}
                          boxOrder={boxOrder}
                          setValue={setValue} />},
      {name: 'Shrnutí objednávky', component: <Summary {...this.props.store.order} totalPrice={totalPrice} />}
    ]

    if (boxOrder) {
      return [
        ...boxOrderSteps,
        ...commonSteps
      ]
    }

    return [
      ...customBoxSteps,
      ...commonSteps
    ]
  }

  render() {
    const { order : { step }, setValue } = this.props.store
    const steps = this.steps(this.props.store)

    return (
      <div>
        <div className='step-progress'>
          <StepZilla steps={steps} stepsNavigation={false} startAtStep={step} onStepChange={this.onStepChange} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }

})
