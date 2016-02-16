import React from 'react'

class CoffeeRunUrlBox extends React.Component {
  constructor(){
    super();
    this.displayCoffeeRunUrlBox.bind(this);
    this.generateCoffeeUrl.bind(this);
  }
  
  generateCoffeeUrl() {
    var uniqueID = this.props.coffeeRunID
    return 'http://localhost:3468/' + uniqueID
  }

  displayCoffeeRunUrlBox() {
    if(this.props.coffeeRunID) {
      var uniqueID = this.generateCoffeeUrl()
      return (
        <div>
          <h3>Share the link below to allow people to add coffee orders to your run </h3>
          <a href={ uniqueID }>{ uniqueID }</a>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        { this.displayCoffeeRunUrlBox() }
      </div>
    )
  }
}

export default CoffeeRunUrlBox
 