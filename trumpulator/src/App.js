import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: "",
      selectedUnit: {},
      selectedTrumpUnit: {},
      selectedUnitData: {},
      unitData: [
        {
          "type":"money",
          "standard": "usd",
          "actualUnits": [
          {
            "name": "usd",
            "inStdUnits": 1.0
          },
          {
            "name": "eur",
            "inStdUnits": 1.24
          }
          ],
          "trumpUnits": [
          {
            "name": "stormy daniels",
            "inStdUnits": 130000
          }
          ]
        },
        {
          "type":"time",
          "standard": "seconds",
          "actualUnits": [
            {
              "name": "seconds",
              "inStdUnits": 1
            },
            {
              "name": "minutes",
              "inStdUnits": 60
            },
            {
              "name": "hours",
              "inStdUnits": 3600
            }
          ],
          "trumpUnits": [
            {
              "name": "scaramucci",
              "inStdUnits": 864000
            }
          ]
        },
        {
          "type": "length",
          "standard": "meters",
          "actualUnits": [
            {
              "name": "meters",
              "inStdUnits": 1
            }
          ],
          "trumpUnits": [
            {
              "name":"trump hands",
              "inStdUnits": 0.03
            }
          ]
        }
      ]
    };

    this.state.selectedUnitData = this.state.unitData[0]
    this.state.selectedUnit = this.state.selectedUnitData["actualUnits"][0]
    this.state.selectedTrumpUnit = this.state.selectedUnitData["trumpUnits"][0]
    
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeUnit = this.handleChangeUnit.bind(this);
    this.inputChange = this.inputChange.bind(this);



  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        Trumpulator
        </header>
        <div className="App-body">
          <div className="unit-size-area">
            <input type="text" className="form-control" 
            placeholder="Input size"
            value={this.state.inputVal}
            onChange={this.inputChange}
            ref={(node) => {this.unitSizeInput = node}}/>
          </div>
          <div className="unit-type-area">
            <select value={this.state.selectedUnitData["type"]} onChange={this.handleChangeType}>
              {this.renderOptions()}
            </select>
          </div>
          <div className="unit-unit-area">
            <select value={this.state.selectedUnit["name"]} onChange={this.handleChangeUnit}>
              {this.renderUnits()}
            </select>
          </div>
          <div className="trump-converted-units" style={{display: (this.state.inputVal == "" ? "none" : "")}}>
            {this.calculateUnit()} {this.state.selectedTrumpUnit["name"]}
          </div>
        </div>
      </div>

    );
  }

  calculateUnit(){
    var val = parseFloat(this.state.inputVal);
    var inStdUnit = this.state.selectedUnit["inStdUnits"];
    var trumpUnitToStdUnit = this.state.selectedTrumpUnit["inStdUnits"];
    return val * inStdUnit / trumpUnitToStdUnit;

  }

  inputChange(event){
    console.log(event.target.value);
    this.setState({inputVal: event.target.value});
  }

  handleChangeType(event){
    console.log(event.target);
    var unitData = this.state.unitData.filter(unitDatum => unitDatum["type"] == event.target.value)[0];
    this.setState({selectedUnitData: unitData, 
                  selectedUnit: unitData["actualUnits"][0], 
                  selectedTrumpUnit: unitData["trumpUnits"][0]});
  }

  handleChangeUnit(event){
    console.log(event);
    var unit = this.state.selectedUnitData["actualUnits"].filter(unit => unit["name"] == event.target.value)[0];
    this.setState({selectedUnit: unit});
  }

  renderOptions(){
    var ret = this.state.unitData.map((unit) => 
      <option value={unit["type"]}> {unit["type"]} </option>
      );
    return ret;
  }

  renderUnits(){
    var unit = this.state.unitData.filter((unit) => unit["type"] == this.state.selectedUnitData["type"]);
    var ret = unit[0]["actualUnits"].map((unit) => 
        <option value={unit["name"]}> {unit["name"]} </option>
      );
    return ret;
  }
}

export default App;
