import React, { Component } from 'react';
import QuestionComponent from './Question';
import questions from '../constants/questions';

export default class Quiz extends React.Component {
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

  getQuestions() {
    return questions.map((q, index) => {
      const number = index + 1;
      q.addPoint = this.addPoint.bind(this);
      return (<QuestionComponent
                key={index}
                number={number} 
                question={q.question} 
                answer={q.answer}
                addPoint={q.addPoint}
                />);
    })
  }
  
  render() {
    const questions = this.getQuestions();
    return (
      <div>
        <div>
          {questions}
        </div>
        <h1 className="score">Your score: {this.state.score}/{questions.length}</h1>
      </div>
    )
  }
}