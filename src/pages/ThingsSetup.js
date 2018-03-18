import React from 'react';
import { Text, TextArea } from '../components/Inputs';
import { changeType, changeDescription } from '../actions';
import { connect } from 'react-redux';

class ThingsSetup extends React.Component {

  changeType = (event) => {
    this.props.changeType(event.target.value);
  }

  changeDescription = (event) => {
    this.props.changeDescription(event.target.value);
  }

  render(){
    let { thing } = this.props;
    
    return (
      <main className="container">
        <div className="row gutter-10">
          <div className="app__left col-2"></div>
          <div className="app__spacer col-1"><div /></div>
          <div className="app__right col-6">
              <Text value={thing.type} label="Type:" onChange={this.changeType} />
              <TextArea value={thing.description} label="Description:" onChange={this.changeDescription} />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  thing: state.activeThing
});

const mapDispatchToProps = (dispatch) => ({
  changeType: (type) => {
    dispatch(changeType('thing', type));
  },
  changeDescription: (description) => {
    dispatch(changeDescription('thing', description));
  }
});

ThingsSetup = connect(mapStateToProps, mapDispatchToProps)(ThingsSetup);

export default ThingsSetup;
