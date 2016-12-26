import { observer } from 'mobx-react'
import React from 'react'
import StepZilla from './StepZilla'
import ChooseBox from './ChooseBox'
import About from './About'
import DeliveryAndPayment from './DeliveryAndPayment'
import Summary from './Summary'

export default observer(class Order extends React.Component {

  render() {
    const { totalPrice, price, deliveryPrice, paymentType, setValue } = this.props.store

    const steps =
    [
      {name: 'Step 1', component: <ChooseBox price={price} setValue={setValue} />},
      {name: 'Step 2', component: <About setValue={setValue} />},
      {name: 'Step 3', component: <DeliveryAndPayment totalPrice={totalPrice}
                          price={price}
                          deliveryPrice={deliveryPrice}
                          paymentType={paymentType}
                          setValue={setValue} />},
      {name: 'Step 4', component: <Summary {...this.props.store} />}
    ]

    return (
      <div>
        <div className='step-progress'>
          <StepZilla steps={steps} stepsNavigation={false} />
        </div>
      </div>
    );
  }

})
