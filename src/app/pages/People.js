import './People.css';

import Card from '../components/Cards';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addPersonType, setPerson } from '../actions';

class NewButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  search = (e) => {
    this.setState({ searchTerm: e.target.value });
  }
  render(){
    let { peopleTypes } = this.props;

    return (
      <div className="row">
        <div className="col-6">
          <div className="">
            <input value={this.state.searchTerm} placeholder="Search" onChange={this.search}/>
          </div>
        </div>
        <div className="people__new-buttons col-6">
          {Object.keys(peopleTypes).filter((k)=>k!=='').map((k,i)=>(
            <Button color="dark-blue"
              key={`button-${i}`}
              linkTo='/people/new/'
              label={`+ ${peopleTypes[k].type}`}
              onClick={()=>{ this.props.addPersonType(peopleTypes[k].id); }}/>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  peopleTypes: state.admin.people.types
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addPersonType
}, dispatch);

NewButtons = connect(mapStateToProps, mapDispatchToProps)(NewButtons);

const PeopleListRow = ({ person, setPerson }) => (
  <Link to={`/people/${person.id}/`} onClick={()=>{setPerson(person)}}>
    <div className="people__list__row">
      {['First Name', 'Last Name', 'types'].map((k,i)=>(
        <div className={`people__list__row__cell ${k==='types' ? 'types' : ''}`} key={`cell-${i}`}>
          {k==='types' && <span>
            {person[k].map((t,i)=>(
              <div className="tag person sm" key={`person-${t}-col-${i}`}>
                {t}
              </div>
            ))}
          </span>}
          {k!=='types' && person[k]}
        </div>
      ))}
    </div>
  </Link>
);

class People extends React.Component{

  render(){
    let { people, setPerson } = this.props;
    return (
      <div className="people">
        <Card title={<NewButtons/>}>
          <div className="people__list">
            {people.map((p,i)=>(
              <PeopleListRow key={`person-list-item-${i}`} person={p} setPerson={setPerson} />
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToPeopleProps = state => ({
  people: state.main.people
});

const mapDispatchToPeopleProps = dispatch => bindActionCreators({
  setPerson
}, dispatch);

People = connect(mapStateToPeopleProps, mapDispatchToPeopleProps)(People);

export default People;
