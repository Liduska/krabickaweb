import React from 'react'

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('xxx');
    this.state = {
      amount: getQueryVariable('amount'),
      paymentType: getQueryVariable('paymentType')
    };
  }

  render() {
    const { paymentType, itemName, amount } = this.state

    if(paymentType !== 'paypal') {
      return (
        <div>
          <h3>Ještě dnes Vám pošleme shrnující e-mail a pokyny k platbě.</h3>
          <div id="content">
            <a href="/" className="btn btn-success btn-lg">Zpátky na Krabičky</a>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h3>Děkujeme za objednávku! Teď už zbývá jediné....</h3>
        <div id="content">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_cart" />
            <input type="hidden" name="upload" value="1" />
            <input type="hidden" name="business" value="FM6N9XUULFWHY" />
            <input type="hidden" name="item_name_1" value="Krabička na míru" />
            <input type="hidden" name="amount_1" value={amount} />
            <input type="hidden" name="currency_code" value="CZK" />
            <input type="hidden" name="shopping_url" value="http://krabickanamiru.cz" />
            <input type="hidden" name="retun" value="http://krabickanamiru.cz/zaplaceno.html" />
            <input type="hidden" name="cancel_return" value="http://krabickanamiru.cz/neuspesna-platba.html" />
            <input type="submit" className="btn btn-success btn-lg" value="Zaplatit přes PayPal" />
          </form>
        </div>
        <h3>Po zaplacení Vám pošleme shrnující e-mail.</h3>
      </div>
    )
  }
}
