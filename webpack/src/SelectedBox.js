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
            <h4>VYBRAL JSTE SI KRABIČKU</h4>
            <h4>{product}</h4>
            <ul dangerouslySetInnerHTML={{__html: productDescription}}></ul>
            <h4>CENA</h4>
            <p>
              {price} Kč
            </p>
            <a href="/hotove-krabicky.html" className="btn btn-default">Změnit výběr</a>
            &nbsp;
            <button onClick={this.cancelUserSelectedBox} className="btn btn-danger btn-sm">Chci si vytvořit vlastní krabičku</button>
          </div>
        </div>
      </div>
    );
  }
})
