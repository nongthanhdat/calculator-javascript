import React, { Component } from "react";
import "./App.css";

interface AppProps {}
interface AppState {
  result: string;
}

class Calculator extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      result: "0"
    };
    this.clear = this.clear.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.enterDecimal = this.enterDecimal.bind(this);
    this.enterZero = this.enterZero.bind(this);
    this.enterOperator = this.enterOperator.bind(this);
    this.enterMinus = this.enterMinus.bind(this);
    this.solve = this.solve.bind(this);
  }

  clear() {
    this.setState({ result: "0" });
  }

  enterZero() {
    this.setState(state => {
      const numbers = `${state.result}0`.replace(/^0+/, "0");
      return { result: numbers };
    });
  }

  enterNumber(num: number) {
    return () =>
      this.setState(state => {
        const numbers = `${state.result.replace(/^0+$/, "")}${num}`;
        return { result: numbers };
      });
  }

  enterDecimal() {
    this.setState(state => {
      const numbers = state.result.split(/[+\-/x]/);
      const lastNumber = numbers[numbers.length - 1];
      return {
        result: /\./.test(lastNumber) ? state.result : state.result + "."
      };
    });
  }

  solve() {
    this.setState(state => {
      try {
        return {
          result: `${eval(state.result.replaceAll("x", "*"))}`
        };
      } catch (e) {
        debugger;
      }
    });
  }

  enterOperator(operator: string) {
    return () =>
      this.setState(state => ({
        result: `${state.result.replace(/[x/+\-]+$/, "")}${operator}`
      }));
  }

  enterMinus() {
    this.setState(state => ({
      result: `${state.result.replace(/[\-]+$/, "")}-`
    }));
  }

  render() {
    return (
      <div className="container">
        <div className="grid">
            <div className="dis">
              <input type="text" value={this.state.result} placeholder="0" disabled/>
            </div>
                <button onClick={this.clear} id="clear" type="button" className="button AC">AC</button>
                <button onClick={this.enterOperator("/")} id="divide" type="button" className="button divide">/</button>
                <button onClick={this.enterOperator("x")} id="multiply" type="button" className="button multiply">x</button>
                <button onClick={this.enterNumber(7)} id="seven" type="button" className="button seven">7</button>
                <button onClick={this.enterNumber(8)} id="eight" type="button" className="button eight">8</button>
                <button onClick={this.enterNumber(9)} id="nine" type="button" className="button nine">9</button>
                <button onClick={this.enterOperator("+")} id="add" type="button" className="button add">+</button>
                <button onClick={this.enterNumber(4)} id="four" type="button" className="button four">4</button>
                <button onClick={this.enterNumber(5)} id="five" type="button" className="button five">5</button>
                <button onClick={this.enterNumber(6)} id="six" type="button" className="button six">6</button>
                <button onClick={this.enterMinus} id="subtract" type="button" className="button subtract">-</button>
                <button onClick={this.enterNumber(1)} id="one" type="button" className="button one">1</button>
                <button onClick={this.enterNumber(2)} id="two" type="button" className="button two">2</button>
                <button onClick={this.enterNumber(3)} id="three" type="button" className="button three">3</button>
                <button onClick={this.solve} id="equals" type="button" className="button equal">=</button>
                <button onClick={this.enterZero} id="zero" type="button" className="button zero">0</button>
                <button onClick={this.enterDecimal} id="decimal" type="button" className="button dot">.</button>
          </div>
      </div>
    );
  }
}

export default Calculator;