import React from 'react';
import { addAttribute, changeType } from '../actions';
import AttributeInput from '../components/AttributeInput';
import Attribute from '../components/Attribute';
import Button from '../components/Button';
import { Text } from '../components/Inputs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ActionsAttributes extends React.Component {
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
    let { action } = this.props;
    return (
      <main className="container">
        <div className="row gutter-10">
          <div className="admin__left col-2">
            <div className="type-edit">
              <Text value={action.type} onChange={this.changeType}/>
            </div>
          </div>
          <div className="admin__spacer col-1"><div /></div>
          <div className="admin__right attributes-wrapper col-6">
            <div className="section-heading">
              <h2>Attributes</h2>
            </div>
            <div className="attributes">
              {action.attributes.map((a,i)=>(
                <Attribute {...a} term="action" key={`attr-${i}`}/>
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
  action: state.admin.activeAction
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAttribute: attribute => addAttribute('action', attribute),
  changeType: type => changeType('action', type)
}, dispatch);

ActionsAttributes = connect(mapStateToProps, mapDispatchToProps)(ActionsAttributes);

export default ActionsAttributes;
