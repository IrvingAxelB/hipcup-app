import React from 'react'
import q from 'q'
import isValid from '../../validationHelperFunctions'
import helperFunc from '../../HelperFunctions'


class CoffeeRunForm extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.createCoffeeRun = this.createCoffeeRun.bind(this);
    this.displayCoffeeForm = this.displayCoffeeForm.bind(this);
    this.displayAlphaError = this.displayAlphaError.bind(this);
    this.displayNumericError = this.displayNumericError.bind(this);
    this.displayRangeError = this.displayRangeError.bind(this);
    this.displayFormError = this.displayFormError.bind(this);
    this.setRunnerName = this.setRunnerName.bind(this);
    this.setMaxOrders = this.setMaxOrders.bind(this);
    this.setTimeAmount = this.setTimeAmount.bind(this);
    this.setTimeUnit = this.setTimeUnit.bind(this);

    this.state = {
      runnerName: '',
      maxOrders: '',
      timeAmount: '',
      timeUnit: 'minutes',
      runStatus: null,
      coffeeRunID: helperFunc.generateUniqueID(),
      isValidForm: false
    }
  }

  setRunnerName(e){
    this.setState({
      runnerName: e.target.value
    })
  }

  setMaxOrders(e){
    this.setState({
      maxOrders: e.target.value
    })
  }

  setTimeAmount(e){
    this.setState({
      timeAmount: e.target.value
    })
  }

  setTimeUnit(e){
    this.setState({
      timeUnit: e.target.value
    })
  }

  displayAlphaError(){
    return isValid.isAlpha(this.state.runnerName) ? null : <span>input must be a-z characters</span>
  }

  displayNumericError(){
    return isValid.isNumeric(this.state.maxOrders) ? null : <span>input must be 0-9 integers</span>
  }

  displayRangeError(){
    return isValid.isNumeric(this.state.timeAmount) ? null : <span>duration must be in numeric characters and less than 2 days (1440 minutes)</span>
  }

  displayFormError(){
    if(this.state.runnerName.length === 0 || this.state.maxOrders.length === 0 || this.state.timeAmount === 0) {
      this.setState({ runStatus: "Required fields cannot be left empty", isValidForm: false });
    } else if (this.displayAlphaError() || this.displayRangeError() || this.displayNumericError()) {
      this.setState({ runStatus: "Please fix all form errors before submitting", isValidForm: false});
    } else {
      this.setState({ runStatus: "Coffee run succcessfully submitted", isValidForm: true}, this.createCoffeeRun);
    }
  }

  displayCoffeeForm() {
      return (
        <div className="coffeeRunForm order-form col-xs-10 col-sm-10 col-md-5 col-lg-6">
          <form className="form-vertical">
            <div className="form-title"> Make a coffee run to { this.props.selectedStore }</div>
            <span className="form-require">Required<span className="require-asterisk">*</span></span>
            <span className="select-different-shop" onClick={() => this.props.routeActions.goBack()}>Click to select a different coffee shop.</span>
            <div className="input-group required col-xs-12 col-sm-11">
              <label>Name:</label>
              <input type="text" className="form-control" ref="runnerName" onChange={this.setRunnerName} require />
              <span className="form-error">{this.displayAlphaError()}</span>
            </div>
            <div className="input-group col-xs-6 col-sm-5 col-md-6 col-lg-6">
              <label>Leaving In:</label>
              <input type="text" className="form-control" ref="timeAmount" onChange={this.setTimeAmount} require />
            </div>
            <div className="input-groupcol-xs-6 col-sm-5 col-md-6 col-lg-6">
              <select className="form-control" ref="timeUntilDuration" onChange={this.setTimeUnit}>
                <option select value="minutes">minutes</option>
                <option value="hours">hours</option>
              </select>         
            </div>
            <span className="form-error col-xs-11 col-sm-11 col-md-11 col-lg-11">{this.displayRangeError()}</span>
            <div className="input-group required col-xs-12 col-sm-11">
              <label>Max Coffee Orders:</label>
              <input type="text" className="form-control" ref="maxOrders" onChange={this.setMaxOrders} require/>
              <span className="form-error">{ this.displayNumericError()}</span>
            </div>
            <div className="input-group required col-xs-12 col-sm-11">
              <label>Slack Channel:</label>
              <select className="form-control" name="slackChannels" ref="slackChannel">
                <option select value="defaultChannel">Default Channel</option>
                <option value="defaultChannel2">Default Channel2</option>
              </select>
            </div>
            <button type="submit" className="btn btn-default button" onClick={this.handleClick}>Create Run</button>
            <span className="form-error">{ this.state.runStatus }</span>
            <span className="form-error">{ this.displayServerErrorMsg() }</span>
          </form>
        </div>
      )
  }

  displayServerErrorMsg(){
    return this.props.coffeeRunErrorMsg ? <span>Coffee Run could not be created. Please re-submit and try again.</span> : null;
  }

  handleClick(e) {
    e.preventDefault();

    // check for and display any form errors 
    this.displayFormError();
  }

  createCoffeeRun() {
    if(this.state.isValidForm) {
      const { coffeeRunAction } = this.props.coffeeRunActions;
      coffeeRunAction({
        coffeeRunID:  this.state.coffeeRunID,
        runnerName:   this.refs.runnerName.value,
        coffeeShop:   this.props.selectedStore,
        address:      this.props.selectedStoreAddress,
        timeStamp:    new Date(),
        maxOrders:    this.refs.maxOrders.value,
        slackChannel: this.refs.slackChannel.value,
        timeAmount:   this.refs.timeAmount.value,
        timeUnit:     this.state.timeUnit
      });
            
      this.refs.runnerName.value = '',
      this.refs.maxOrders.value = '',
      this.refs.timeAmount.value = ''
    } 
  }

  render() {
    return (
      <div className="coffeeRunForm">
       {this.displayCoffeeForm()}
      </div>
    )
  }
}

export default CoffeeRunForm
 