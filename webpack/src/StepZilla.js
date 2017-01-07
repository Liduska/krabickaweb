import React, { Component, PropTypes } from 'react';

export default class StepZilla extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: this.props.startAtStep,
      navState: this._getNavStates(this.props.startAtStep, this.props.steps.length),
      nextStepText: 'Další'
    };

    this.hidden = {
      display: 'none'
    };

    this.jumpToStep = this._jumpToStep.bind(this);
    this.handleKeyDown = this._handleKeyDown.bind(this);
    this.next = this._next.bind(this);
    this.previous = this._previous.bind(this);
  }

  componentDidMount() {
    this._checkNavState(this.state.compState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.steps.length !== nextProps.steps.length) { // When number of steps changed we want to update state immediately
      this.setState({navState: this._getNavStates(this.state.compState, nextProps.steps.length)});
    }
  }

  _getNavStates(indx, length) {
    let styles = [];

    for (let i=0; i<length; i++) {
      if (i < indx) {
        styles.push('done');
      }
      else if (i === indx) {
        styles.push('doing');
      }
      else {
        styles.push('todo');
      }
    }

    return { current: indx, styles: styles }
  }

  _checkNavState(currentStep){
    if (currentStep > 0 && currentStep !== this.props.steps.length - 1) {
      let correctNextText = 'Další';

      if (currentStep == this.props.steps.length - 2) {
        // we are in the one before final step
        correctNextText = this.props.nextTextOnFinalActionStep
      }

      this.setState({
        showPreviousBtn: true,
        showNextBtn: true,
        nextStepText: correctNextText
      });
    }
    else if (currentStep === 0 ) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      });
    }
    else {
      this.setState({
        showPreviousBtn: (this.props.prevBtnOnLastStep) ? true : false,
        showNextBtn: true,
        nextStepText: 'Odeslat objednávku'
      });
    }
  }

  _setNavState(next) {
    this.setState({navState: this._getNavStates(next, this.props.steps.length)});
    this.props.onStepChange(next);
    if (next < this.props.steps.length) {
      this.setState({compState: next});
    }

    this._checkNavState(next);
  }

  // handles keydown on enter being pressed in any Child component input area. in this case it goes to the next
  _handleKeyDown(evt) {
    if (evt.which === 13) {
      if (!this.props.preventEnterSubmission) {
        this._next();
      }
    }
  }

  // this utility method lets Child components invoke a direct jump to another step
  _jumpToStep(evt) {
    if (evt.target == undefined) {
      // a child step wants to invoke a jump between steps
      this._setNavState(evt);
    }
    else {
      // the main navigation step ui is invoking a jump between steps
      if (!this.props.stepsNavigation) {
        evt.preventDefault();
        evt.stopPropagation();

        return;
      }

      if (this.props.dontValidate || typeof this.refs.activeComponent.isValidated == 'undefined' || this.refs.activeComponent.isValidated() ) {
          if (evt.target.value === (this.props.steps.length - 1) &&
            this.state.compState === (this.props.steps.length - 1)) {
              this._setNavState(this.props.steps.length);
          }
          else {
            this._setNavState(evt.target.value);
          }
      }
    }
  }

  _next() {
    if (this.state.compState === this.props.steps.length - 1) {
      this.setState({
        disableNextBtn: true
      })
      this.props.onSubmit()
      return
    }
    // if its a form component, it should have implemeted a public isValidated class. If not then continue
    if (this.props.dontValidate || typeof this.refs.activeComponent.isValidated == 'undefined' || this.refs.activeComponent.isValidated()) {
      this._setNavState(this.state.compState + 1);
    }
  }

  _previous() {
    if (this.state.compState > 0) {
      this._setNavState(this.state.compState - 1);
    }
  }

  _getClassName(className, i){
    let liClassName = className + "-" + this.state.navState.styles[i];

    // if step ui based navigation is disabled, then dont highlight step
    if (!this.props.stepsNavigation)
        liClassName += " no-hl";

    return liClassName;
  }

  _renderSteps() {
    return this.props.steps.map((s, i)=> (
      <li className={this._getClassName("progtrckr", i)} onClick={this.jumpToStep} key={i} value={i}>
        <em>{i+1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  render() {
    // clone the step component dynamically and tag it as activeComponent so we can validate it on next. also bind the jumpToStep piping method
    const compToRender = React.cloneElement(this.props.steps[this.state.compState].component, {
        ref: 'activeComponent',
        jumpToStep: (t) => {
          this.jumpToStep(t);
        }
    });

    return (
      <div className="multi-step full-height" onKeyDown={this.handleKeyDown}>

        {
          this.props.showSteps
          ? <div className="progtrckr-wrapper">
              <ol className="progtrckr">
                {this._renderSteps()}
              </ol>
            </div>
          : <span></span>
        }

        {compToRender}

        <div style={this.props.showNavigation ? {} : this.hidden} className="footer-buttons">

          <button style={this.state.showPreviousBtn ? {} : this.hidden}
                  className="btn btn-default btn-lg pull-left"
                  onClick={this.previous}><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Zpět</button>

          <button style={this.state.showNextBtn ? {} : this.hidden}
                  disabled={this.state.disableNextBtn}
                  className="btn btn-default btn-lg pull-right"
                  onClick={this.next}>{this.state.nextStepText} <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
        </div>
      </div>
    );
  }
}

StepZilla.defaultProps = {
  showSteps: true,
  showNavigation: true,
  stepsNavigation: true,
  prevBtnOnLastStep: true,
  dontValidate: false,
  preventEnterSubmission: false,
  startAtStep: 0,
  onStepChange: () => {},
  nextTextOnFinalActionStep: "Další"
};
