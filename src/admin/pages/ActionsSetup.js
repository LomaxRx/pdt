import React from 'react';
import { Text, TextArea } from '../components/Inputs';
import { changeType, changeDescription } from '../actions';
import { connect } from 'react-redux';

class ActionSetup extends React.Component {

  changeType = (event) => {
    this.props.changeType(event.target.value);
  }

  changeDescription = (event) => {
    this.props.changeDescription(event.target.value);
  }

  render(){
    let { action } = this.props;
    return (
      <main className="container">
        <div className="row gutter-10">
          <div className="admin__left col-2"></div>
          <div className="admin__spacer col-1"><div /></div>
          <div className="admin__right col-6">
              <Text value={action.type} label="Type:" onChange={this.changeType} />
              <TextArea value={action.description} label="Description:" onChange={this.changeDescription} />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  action: state.admin.activeAction
});

const mapDispatchToProps = (dispatch) => ({
  changeType: (type) => {
    dispatch(changeType('action', type));
  },
  changeDescription: (description) => {
    dispatch(changeDescription('action', description));
  }
});

ActionSetup = connect(mapStateToProps, mapDispatchToProps)(ActionSetup);

export default ActionSetup;
