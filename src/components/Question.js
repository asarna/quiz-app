import React, { Component } from 'react';
import Option from './Option';

export default class Question extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      //getPoint: false
    };
  }
  
  checkAnswer() {
    this.setState({
      answered: true
    })
  }
  
  render() {
    const { number, question, addPoint, answer } = this.props;
    return (
      <div className="question">
        <h2>{`${number}`}. "{question}"</h2>
          <div className="choice-wrapper">
            <Option 
              name="Hillary Clinton" 
              headshot="http://imghost.sarna.me/hilldawg.jpg" 
              number={number}
              addPoint={addPoint}
              checkAnswer={this.checkAnswer.bind(this)}
              correctOption={("Hillary Clinton" === this.props.answer)}
              answered={this.state.answered}
            />
            <Option 
              name="Leslie Knope" 
              headshot="http://imghost.sarna.me/knope.jpg" 
              number={number}
              addPoint={addPoint}
              checkAnswer={this.checkAnswer.bind(this)}
              correctOption={("Leslie Knope" === answer)}
              answered={this.state.answered}
              />
          </div>
      </div>)
  }
}