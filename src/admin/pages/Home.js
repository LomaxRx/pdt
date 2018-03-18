import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPeople, addAttribute } from '../actions';
import slugify from '../slugify';

class Home extends React.Component {
  state = { val: '' }
  constructor(props){
    super(props);
    this.state = { val: '' };
  }
  onChange = (e) => {
    this.setState({ val: e.target.value });
  }
  newPeople = () => {
    let { addPeople, changePage } = this.props;
    addPeople(this.state.val)
    changePage(`/people/${slugify(this.state.val)}/`);
  }
  render(){
    let { addPeople, state, changePage } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">PEOPLE.</h3>
              <div>
                <form onSubmit={(e)=> { e.preventDefault(); }}>
                  <input type="text" value={this.state.val} onChange={this.onChange}/>
                  <a href="#" className="btn btn-primary" onClick={this.newPeople}>add</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  state: state.admin
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  addPeople: (val) => addPeople(val)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
