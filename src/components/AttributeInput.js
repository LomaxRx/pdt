import React from 'react';
import Button from './Button';
import './AttributeInput.css';

const SelectOption = ({ value, active, onClick }) => (
  <div className={`attribute-input__select__option${active==value ? ' active' : ''}`} onClick={()=>{onClick(value)}}>
    {value}
  </div>
)

export default class AttributeInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      type: 'text'
    }
  }

  changeType = (type) => {
    this.setState({ type });
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  }

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  save = () => {
    this.props.save(this.state);
  }

  render(){
    return (
      <div className="attribute-input">
        <div className="attribute-input__select">
          <SelectOption value='text' active={this.state.type} onClick={this.changeType} />
          <SelectOption value='number' active={this.state.type} onClick={this.changeType} />
          <SelectOption value='select' active={this.state.type} onClick={this.changeType} />
          <SelectOption value='date' active={this.state.type} onClick={this.changeType} />
        </div>
        <div className="attribute-input__input">
          <div className="attribute-input__input__group">
            <label>Name</label>
            <input type="text" value={this.state.name} onChange={this.changeName} />
          </div>
          <div className="attribute-input__input__group">
            <label>Description</label>
            <textarea type="text" rows="2" value={this.state.description} onChange={this.changeDescription} />
          </div>
        </div>
        <div className="attribute-input__buttons">
          <Button onClick={this.save} label="Save" />
        </div>
      </div>
    );
  }
}
