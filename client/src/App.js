import React, { Component } from 'react';
import './App.css';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
  }
  
  addPoint() {
    this.setState({
      score: this.state.score + 1
    })
  }
  
  render() {
    const questions = this._getQuestions();
    return (
      <div>
        
        <div>
          {questions}
        </div>
        <h1 className="score">Your score: {this.state.score}/{questions.length}</h1>
      </div>
    )
  }
  
  _getQuestions() {
    var addPoint = this.addPoint.bind(this);
    const questionList = [{
      id: 1,
      question: "I think we have a huge fun deficit. And we need to figure out how to fill that fun deficit.",
      answer: "Hillary Clinton"
    }, {
      id: 2,
      question: "I've watched a lot of cats do a lot of weird and interesting things.",
      answer: "Hillary Clinton"
    },{
      id: 3,
      question: "The thing about youth culture is... I don't understand it.",
      answer: "Leslie Knope"
    }, {
      id: 4,
      question: "It's not over until the lady in the pantsuit says it is.",
      answer: "Hillary Clinton"
    }, {
      id: 5,
      question: "What I hear when I'm being yelled at is people caring really loudly at me.",
      answer: "Leslie Knope"
    }, {
      id: 6,
      question: "My two secrets to staying healthy: wash your hands all the time, and the other is hot peppers. I eat a lot of hot peppers.",
      answer: "Hillary Clinton"
    }, {
      id: 7,
      question: "We have to remember what's really important in life: friends, waffles, and work.",
      answer: "Leslie Knope"
    }, {
      id: 8,
      question: "I would like to be president someday, so no, I've not smoked marijuana.",
      answer: "Leslie Knope"
    }, {
      id: 9,
      question: "Europe is a miracle.",
      answer: "Hillary Clinton"
    }, {
      id: 10,
      question: "I'm not even a human being. I was constructed in a garage in Palo Alto a very long time ago.",
      answer: "Hillary Clinton"
    }, {
      id: 11,
      question: "I guess some people object to powerful depictions of awesome ladies.",
      answer: "Leslie Knope"
    }, {
      id: 12,
      question: "I find it relaxing and entertaining and informative, watching HGTV.",
      answer: "Hillary Clinton"
    } ]

    return questionList.map(function(question) {
      question.addPoint = addPoint;
      return (<Question 
                number={question.id} 
                question={question.question} 
                answer={question.answer}
                addPoint={question.addPoint}
                />);
    })
  }
}

class Question extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      //getPoint: false
    };
  }
  
  checkAnswer() {
    //alert("checkAnswer");
    this.setState({
      answered: true
    })
  }
  
  render() {
    let op1truthiness = ("Hillary Clinton" === this.props.answer);
    let op2truthiness = ("Leslie Knope" === this.props.answer);
    let disableButton;
    return (
      <div className="question">
        <h2>{this.props.number}. "{this.props.question}"</h2>
          <div className="choice-wrapper">
            <Option 
              name="Hillary Clinton" 
              headshot="https://upload.wikimedia.org/wikipedia/commons/2/27/Hillary_Clinton_official_Secretary_of_State_portrait_crop.jpg" 
              number={this.props.number}
              addPoint={this.props.addPoint}
              checkAnswer={this.checkAnswer.bind(this)}
              correctOption={op1truthiness}
              answered={this.state.answered}
            />
            <Option 
              name="Leslie Knope" 
              headshot="https://media.glamour.com/photos/569580c38fa134644ec26260/master/pass/entertainment-2015-01-leslie-knope-final-season-main.jpg" 
              number={this.props.number}
              addPoint={this.props.addPoint}
              checkAnswer={this.checkAnswer.bind(this)}
              correctOption={op2truthiness}
              answered={this.state.answered}
              />
          </div>
      </div>)
  }
}

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chosen: false
    }
  }
  
  clickHandle() {
    if (!this.props.answered) {
      this.setState({
        chosen: true
      })
    
      if(this.props.correctOption) {
        this.props.addPoint();
      }
      this.props.checkAnswer();
      document.getElementById(this.props.name + this.props.number).setAttribute("onClick", null);
    }
  }

  render() {
    let btnClasses;
    if (this.props.correctOption && this.state.chosen) {
      btnClasses = "correct";
    } else if (this.state.chosen) {
      btnClasses = "wrong";
    }
    let disableButton = false;
    if (this.props.answered && !this.state.chosen) {
      disableButton = true;
    }
    let optClasses = "";
    if (this.props.correctOption && this.props.answered) {
      optClasses = " showAnswer";
    }
    return (
      <div className={"option-wrapper" + optClasses}>
      <img className="headshot" src={this.props.headshot} />
      <div className="selector">
        <p className="name">{this.props.name}</p>
        <button 
          id={this.props.name + this.props.number} 
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
export default Quiz;
