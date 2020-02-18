import React, { Component } from 'react';
import './App.css';
import axios from '../axios'

import Form from '../components/Form/Form';
import ApplicantCards from './ApplicantCards/ApplicantCards';

class App extends Component {
  state = ({
    applicant: {
      name: '',
      email: '',
      age: '',
      phoneNum: '',
      prefWayOfComm: '',
      englLevel: '',
      availableToStart: '',
      techSkills: '',
      shortPres: '',
      studyFromHome: false
    },
    submited: false,
    showBackdrop: false,
    editMode: false,
    submitedApplicantId: null
  });

  //Store form input values in state
  // nameHandler = (e) => {
  //   const updatedApplicant = { ...this.state.applicant };
  //   updatedApplicant[e.target.name] = e.target.value;
  //   this.setState({ applicant: updatedApplicant });
  // };

  //Check button state 
  // checkChangeHandler = () => {
  //   const applicant = this.state.applicant;
  //   const updatedApplicant = { ...applicant };
  //   updatedApplicant.studyFromHome = !applicant.studyFromHome;
  //   this.setState({ applicant: updatedApplicant })
  // };

  //Get form data stored in the state and pass it to server
  submitHandler = (submitApplicant) => {
    axios.post('/applicants.json', submitApplicant)
      .then(response => {
        this.setState({ submited: true, submitedApplicantId: response.data.name });
      })
      .catch(error => console.log(error));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.submited === nextState.submited) {
      console.log('App shouldCompUpdate false');
      return false;
    } else {
      console.log('App shouldCompUpdate true');
      //console.log(nextState);
      this.setState({ submited: false })
      return true;
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="Title">Application Manager</h1>
        <div className="MainWrapper">
          <Form submit={this.submitHandler} />
          <ApplicantCards
            submited={this.state.submited}
            submitedApplicantId={this.state.submitedApplicantId}
          />

        </div>

      </React.Fragment>
    )
  }
}

export default App;
