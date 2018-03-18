import './Admin.css';
import React, { Component } from 'react';
import Header from '../components/Header.js';
import Subheader, { MenuList } from '../components/Subheader.js';
import { Heading1 } from '../components/SectionHeadings';
import Button from '../components/Button';
import Term from '../components/Term';
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';

let Admin = ({people, actions, things}) => (
  <div className="admin">
    <Subheader title='Admin'>
      <MenuList items={[
        { label: 'Glossary', linkTo: '/' },
        { label: 'Relationships', linkTo: '/relationships/' }
      ]} />
    </Subheader>
    <main className="container">
      <div className="row gutter-10">
        <div className="app__left col-2"></div>
        <div className="app__spacer col-1"><div /></div>
        <div className="app__right col-6">
          <section>
            <Heading1 label="People" color="blue">
              <Button color="blue" className="button-square-15 add-term" label="+" linkTo="/people/new/" />
            </Heading1>
            <div className="terms">
              {Object.keys(people.types).filter((k)=>k!='').map((k,i)=>(
                <Term term={people.types[k]}
                  linkTo={`/people/${people.types[k].id}/`}
                  key={`person-type-${i}`} />
              ))}
            </div>
          </section>
          <section>
            <Heading1 label="Actions" color="green" >
              <Button color="green" className="button-square-15 add-term" label="+" linkTo="/actions/new/"/>
            </Heading1>
            <div className="terms">
              {Object.keys(actions.types).map((k,i)=>(
                  <Term term={actions.types[k]}
                    linkTo={`/actions/${actions.types[k].id}/`}
                    key={`action-type-${i}`}
                  />
              ))}
            </div>
          </section>
          <section>
            <Heading1 label="Things" color="orange" >
              <Button color="orange" className="button-square-15 add-term" label="+" linkTo="/things/new/"/>
            </Heading1>
            <div className="terms">
              {Object.keys(things.types).map((k,i)=>(
                <Term term={things.types[k]}
                  linkTo={`/things/${things.types[k].id}/`}
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
  people: state.people,
  actions: state.actions,
  things: state.things
});

export default Admin = connect(mapStateToProps)(Admin);
