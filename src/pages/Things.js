import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { saveThing, setThing, resetThing } from '../actions';
import Subheader, { MenuList } from '../components/Subheader.js';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ThingsSetup from './ThingsSetup';
import ThingsAttributes from './ThingsAttributes';
import ThingsRelationships from './ThingsRelationships';
import { Route, Switch } from 'react-router-dom';

class Things extends React.Component {
  componentWillMount(){
    let { match: { params: { id } }, things} = this.props;
    if(id !== 'new')
      this.props.setThing(things.types[id]);
  }
  componentDidMount(){
    window.scrollTo(0,0);
  }

  save = () => {
    this.props.saveThing(this.props.thing);
    this.props.resetThing();
    this.props.changePage('/');
  }

  cancel = () => {
    this.props.resetThing();
    this.props.changePage('/');
  }

  render(){
    let { match: { params: { id } }} = this.props;

    return (
      <div className="people">
        <Subheader title='Thing:' color='orange' buttons={[
          <a className="button red" onClick={this.cancel}>cancel</a>,
          <a className="button" onClick={this.save}>save</a>
        ]}>
          <MenuList items={[
            { label: 'Setup', linkTo: `/things/${id}/` },
            { label: 'Attributes', linkTo: `/things/${id}/attributes/` },
            { label: 'Relationships', linkTo: `/things/${id}/relationships/` },
          ]} />
        </Subheader>
        <Route path="/things/:id/" exact component={ThingsSetup} />
        <Route path="/things/:id/attributes/" exact component={ThingsAttributes} />
        <Route path="/things/:id/relationships/" exact component={ThingsRelationships} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  saveThing: (thing) => saveThing(thing),
  setThing: (thing) => setThing(thing),
  resetThing
}, dispatch);


const mapStateToProps = state => ({
  things: state.things,
  thing: state.activeThing
});

export default Things = connect(mapStateToProps, mapDispatchToProps)(Things)
