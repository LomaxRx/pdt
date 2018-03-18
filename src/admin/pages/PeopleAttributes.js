import React from 'react';
import { addAttribute, changeType } from '../actions';
import AttributeInput from '../components/AttributeInput';
import Attribute from '../components/Attribute';
import Button from '../components/Button';
import { Text } from '../components/Inputs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PeopleAttributes extends React.Component {
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
    let { person, addAttribute } = this.props;
    return (
      <main className="container">
        <div className="row gutter-10">
          <div className="app__left col-2">
            <div className="type-edit">
              <Text value={person.type} onChange={this.changeType}/>
            </div>
          </div>
          <div className="app__spacer col-1"><div /></div>
          <div className="app__right person-attributes col-6">
            <div className="section-heading">
              <h2>Attributes</h2>
            </div>
            <div className="attributes">
              {person.attributes.map((a,i)=>(
                <Attribute {...a} term="person"/>
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
  person: state.admin.activePerson
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAttribute: attribute => addAttribute('person', attribute),
  changeType: type => changeType('person', type)
}, dispatch);

PeopleAttributes = connect(mapStateToProps, mapDispatchToProps)(PeopleAttributes);

export default PeopleAttributes;
