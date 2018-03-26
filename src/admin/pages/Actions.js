import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { saveAction, setAction, resetAction } from '../actions';
import Subheader, { MenuList } from '../components/Subheader.js';
import ActionsSetup from './ActionsSetup';
import ActionsAttributes from './ActionsAttributes';
import ActionsRelationships from './ActionsRelationships';
import { Route } from 'react-router-dom';

class Actions extends React.Component {
  componentWillMount(){
    let { match: { params: { id } }, actions} = this.props;
    if(id==='new') return;
      this.props.setAction(actions.types[id]);
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  save = () => {
    this.props.saveAction(this.props.action);
    this.props.resetAction();
    this.props.changePage('/admin/');
  }

  cancel = () => {
    this.props.resetAction();
    this.props.changePage('/admin/');
  }

  render(){
    let { match: { params: { id } }} = this.props;
    return (
      <div className="people">
        <Subheader title='Action:' color='green' admin={true} buttons={[
          <a className="button red" onClick={this.cancel}>cancel</a>,
          <a className="button" onClick={this.save}>save</a>
        ]}>
          <MenuList items={[
            { label: 'Setup', linkTo: `/admin/actions/${id}/` },
            { label: 'Attributes', linkTo: `/admin/actions/${id}/attributes/` },
            { label: 'Relationships', linkTo: `/admin/actions/${id}/relationships/` },
          ]} />
        </Subheader>
        <Route path="/admin/actions/:id/" exact component={ActionsSetup} />
        <Route path="/admin/actions/:id/attributes/" component={ActionsAttributes} />
        <Route path="/admin/actions/:id/relationships/" component={ActionsRelationships} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  saveAction: (action) => saveAction(action),
  setAction: (action) => setAction(action),
  resetAction
}, dispatch);


const mapStateToProps = state => ({
  actions: state.admin.actions,
  action: state.admin.activeAction
});

export default Actions = connect(mapStateToProps, mapDispatchToProps)(Actions)
