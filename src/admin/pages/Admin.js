import './Admin.css';
import React from 'react';
import Subheader, { MenuList } from '../components/Subheader.js';
import { Heading1 } from '../components/SectionHeadings';
import Button from '../components/Button';
import Term from '../components/Term';
import { connect } from 'react-redux';

let Admin = ({people, actions, things}) => (
  <div className="admin">
    <Subheader title='Admin' admin={true}>
      {console.log(people)}
      <MenuList items={[
        { label: 'Glossary', linkTo: '/admin/' },
        { label: 'Relationships', linkTo: '/admin/relationships/' },
        { label: 'Your Organization', linkTo: '/admin/org/' }
      ]} />
    </Subheader>
    <main className="container">
      <div className="row gutter-10">
        <div className="admin__left col-2"></div>
        <div className="admin__spacer col-1"><div /></div>
        <div className="admin__right col-6">
          <section>
            <Heading1 label="People" color="blue">
              <Button color="blue" className="button-square-15 add-term" label="+" linkTo="/admin/people/new/" />
            </Heading1>
            <div className="terms">
              {Object.keys(people.types).filter((k)=>k!=='').map((k,i)=>(
                <Term term={people.types[k]}
                  linkTo={`/admin/people/${people.types[k].id}/`}
                  key={`person-type-${i}`} />
              ))}
            </div>
          </section>
          <section>
            <Heading1 label="Actions" color="green" >
              <Button color="green" className="button-square-15 add-term" label="+" linkTo="/admin/actions/new/"/>
            </Heading1>
            <div className="terms">
              {Object.keys(actions.types).map((k,i)=>(
                  <Term term={actions.types[k]}
                    linkTo={`/admin/actions/${actions.types[k].id}/`}
                    key={`action-type-${i}`}
                  />
              ))}
            </div>
          </section>
          <section>
            <Heading1 label="Things" color="orange" >
              <Button color="orange" className="button-square-15 add-term" label="+" linkTo="/admin/things/new/"/>
            </Heading1>
            <div className="terms">
              {Object.keys(things.types).map((k,i)=>(
                <Term term={things.types[k]}
                  linkTo={`/admin/things/${things.types[k].id}/`}
                  key={`thing-type-${i}`}/>
                ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
);

const mapStateToProps = (state) => ({
  people: state.admin.people,
  actions: state.admin.actions,
  things: state.admin.things
});

export default Admin = connect(mapStateToProps)(Admin);
