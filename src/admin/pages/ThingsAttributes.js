import React from 'react';
import { addAttribute, changeType } from '../actions';
import AttributeInput from '../components/AttributeInput';
import Attribute from '../components/Attribute';
import Button from '../components/Button';
import { Text } from '../components/Inputs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ThingsAttributes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      attributeInput: false
    }
  }
  showAttributeInput = () => {
    this.setState({ attributeInput: true })
  }

  addAttribute = (attribute) => {
    this.props.addAttribute(attribute);
    this.setState({ attributeInput: false });
  }

  changeType = (event) => {
    this.props.changeType(event.target.value)
  }


  render(){
    let { thing, addAttribute } = this.props;
    return (
      <main className="container">
        <div className="row gutter-10">
          <div className="app__left col-2">
            <div className="type-edit">
              <Text value={thing.type} onChange={this.changeType}/>
            </div>
          </div>
          <div className="app__spacer col-1"><div /></div>
          <div className="app__right attributes-wrapper col-6">
            <div className="section-heading">
              <h2>Attributes</h2>
            </div>
            <div className="attributes">
              {thing.attributes.map((a,i)=>(
                <Attribute {...a} term="thing"/>
              ))}
            </div>
            <div className="add-attribute-button">
              <Button label="+ attribute" onClick={this.showAttributeInput}/>
            </div>
            <div className="attribute-input-wrapper">
              {this.state.attributeInput &&
                <AttributeInput save={this.addAttribute} />
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  thing: state.admin.activeThing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAttribute: attribute => addAttribute('thing', attribute),
  changeType: type => changeType('thing', type)
}, dispatch);

ThingsAttributes = connect(mapStateToProps, mapDispatchToProps)(ThingsAttributes);

export default ThingsAttributes;
