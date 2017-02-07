import { observer } from 'mobx-react'
import React from 'react'

export default observer(class SelectedBox extends React.Component {

  cancelUserSelectedBox = () => {
    this.props.cancelUserSelectedBox()
  }

  render() {
    const { product, productDescription, price } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-4">
            <h4>{product}</h4>
            <ul dangerouslySetInnerHTML={{__html: productDescription}}></ul>
            <p>
            <strong>Cena krabičky:</strong> {price} Kč
            </p>
            <a href="/hotove-krabicky.html" className="btn btn-default">Chci změnit výběr krabičky</a>
            &nbsp;
            <button onClick={this.cancelUserSelectedBox} className="btn btn-default">Dám přednost krabičce na míru</button>
          </div>
        </div>
      </div>
    );
  }
})
