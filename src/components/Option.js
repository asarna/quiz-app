import React, { Component } from 'react';

export default class Option extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chosen: false
    }
  }
  
  clickHandle() {
    const { answered, correctOption, addPoint, checkAnswer } = this.props;

    if (!answered) {
      this.setState({
        chosen: true
      })
    
      if(correctOption) {
        addPoint();
      }
      checkAnswer();

      document.getElementById(this.props.name + this.props.number).setAttribute("onClick", null);
    }
  }

  render() {
    const { correctOption, answered, headshot, name, number } = this.props;

    let btnClasses;
    let disableButton = false;
    let optClasses = "";

    if (correctOption && this.state.chosen) {
      btnClasses = "correct";
    } else if (this.state.chosen) {
      btnClasses = "wrong";
    }
    
    if (answered && !this.state.chosen) {
      disableButton = true;
    }
    
    if (correctOption && answered) {
      optClasses = " showAnswer";
    }
    return (
      <div className={"option-wrapper" + optClasses}>
      <img className="headshot" src={headshot} />
      <div className="selector">
        <p className="name">{name}</p>
        <button 
          id={name + number} 
          className={btnClasses}
          onClick={this.clickHandle.bind(this)}
          disabled={disableButton}
          >
     
        <svg className="circle">
          <polyline className="line check" points="0 12 10 22 35 0" fill="none" />
          <polyline className="line cross" points="0 0 25 25" fill="none" />
          <polyline className="line cross delay" points="30 0 0 30" fill="none" />
        </svg>
        
      </button>
      </div>
    </div>
    )
  }

}