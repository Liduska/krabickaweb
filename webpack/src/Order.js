import { observer } from 'mobx-react'
import React from 'react'
import StepZilla from './StepZilla'
import ChooseBox from './ChooseBox'
import About from './About'
import DeliveryAndPayment from './DeliveryAndPayment'
import Summary from './Summary'

export default observer(class Order extends React.Component {

  onStepChange = (step) => {
    this.props.store.setValue('step', step)
  }

  onSubmit = () => {
    this.props.store.submitOrder()
  }

  render() {
    const { order : { step, totalPrice, price, deliveryPrice, paymentType }, setValue } = this.props.store

    const steps =
    [
      {name: 'Výběr krabičky', component: <ChooseBox price={price} setValue={setValue} />},
      {name: 'Bližší informace', component: <About setValue={setValue} />},
      {name: 'Platba a doručení', component: <DeliveryAndPayment totalPrice={totalPrice}
                          price={price}
                          deliveryPrice={deliveryPrice}
                          paymentType={paymentType}
                          setValue={setValue} />},
      {name: 'Shrnutí objednávky', component: <Summary {...this.props.store.order} totalPrice={totalPrice} />}
    ]

    return (
      <div>
        <div className='step-progress'>
          <StepZilla steps={steps} stepsNavigation={false} startAtStep={step} onStepChange={this.onStepChange} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }

})
