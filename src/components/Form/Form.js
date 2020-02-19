import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Form.css';



class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicant: {
                name: props.name || '',
                email: props.email || '',
                age: props.age || '',
                phoneNum: props.phoneNum || '',
                prefWayOfComm: props.prefWayOfComm || '',
                englLevel: props.englLevel || '',
                availableToStart: props.availableToStart || '',
                techSkills: props.techSkills || '',
                shortPres: props.shortPres || '',
                studyFromHome: props.studyFromHome || false,
                id: props.id,
            },
            cancel: props.cancel,
            editMode: props.show,
            save: props.save,
        };
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.saveEditedApplicantHandler = this.saveEditedApplicantHandler.bind(this);
    }

    //Store form input values in state
    inputHandler = (e) => {
        const updatedApplicant = { ...this.state.applicant };
        updatedApplicant[e.target.name] = e.target.value;
        this.setState({ applicant: updatedApplicant });
    };

    //Check button state 
    checkChangeHandler = () => {
        const updatedApplicant = { ...this.state.applicant };
        updatedApplicant.studyFromHome = !this.state.applicant.studyFromHome;
        this.setState({ applicant: updatedApplicant });
    };

    submit = (e) => {
        e.preventDefault();
        this.props.submit(this.state.applicant)
    }

    saveEditedApplicantHandler = (e) => {
        e.preventDefault();
        let appState = this.state.applicant;
        this.props.save(appState)
    }

    render() {
        let formClasses = this.state.editMode ? 'MainForm FormForEdit' : 'MainForm';
        let cancelBtn = this.state.editMode ? <input type="submit" className="CancelBtn" value='Cancel' onClick={this.cancel} /> : null;
        return (
            <React.Fragment>
                <form className={formClasses} onSubmit={this.state.editMode ? this.saveEditedApplicantHandler : this.submit}>
                    <fieldset>
                        <legend className='Student'>Add Student</legend>
                        <label>Name *:</label><br />
                        <input
                            onChange={this.inputHandler}
                            type="text"
                            name="name"
                            placeholder="Enter student name..."
                            value={this.state.applicant.name} />
                        <br />
                        <label>Email *:</label><br />
                        <input
                            onChange={this.inputHandler}
                            type="email"
                            name="email"
                            placeholder="Enter e-mail..."
                            value={this.state.applicant.email} />
                        <br />
                        <label>Age *:</label><br />
                        <input
                            onChange={this.inputHandler}
                            type="number"
                            name="age"
                            placeholder="Enter student age..."
                            value={this.state.applicant.age} />
                        <br />
                        <label>Phone Number *:</label><br />
                        <input
                            onChange={this.inputHandler}
                            className="PhoneNumber"
                            type="number"
                            name="phoneNum"
                            placeholder="Enter Phone 08..."
                            value={this.state.applicant.phoneNum} />

                        <p className="PrefCom">Preferred Way of Communication *</p>
                        <div className="EmailRadio">
                            <label>
                                <input
                                    onChange={this.inputHandler}
                                    type="radio"
                                    name="prefWayOfComm"
                                    value="Email"
                                    className="Email"
                                    checked={this.state.applicant.prefWayOfComm === 'Email'} />E-mail
                                 </label>
                        </div>
                        <div className="PhoneRadio">
                            <label>
                                <input
                                    onChange={this.inputHandler}
                                    type="radio"
                                    name="prefWayOfComm"
                                    value="Phone"
                                    className="Phone"
                                    checked={this.state.applicant.prefWayOfComm === 'Phone'} />Phone
                                   </label>
                        </div>


                        <label className="EnglLevelLabel">English Level *</label>
                        <br />
                        <select
                            onChange={this.inputHandler}
                            name='englLevel'
                            className="EnglLevel"
                            defaultValue={this.state.applicant.englLevel || 'not set'}>
                            <option value="">-- None --</option>
                            <option name='A1' value="A1">A1</option>
                            <option name='A2' value="A2">A2</option>
                            <option name='B1' value="B1">B1</option>
                            <option name='B2' value="B2">B2</option>
                            <option name='C1' value="C1">C1</option>
                            <option name='C2' value="C2">C2</option>
                        </select>
                        <br />
                        <label name='availableToStart' className="DateAvailable">Available to Start *:</label>
                        <br />
                        <input
                            onChange={this.inputHandler}
                            type="date" className="Date"
                            name="availableToStart"
                            defaultValue={this.state.applicant.availableToStart} />
                        <br />
                        <label>Technical Skills and Courses <span className="Opt">(optional)</span>:</label>
                        <br />
                        <textarea
                            onChange={this.inputHandler}
                            name="techSkills"
                            className="TechSkills"
                            rows="2" cols="40"
                            placeholder="Enter info..."
                            value={this.state.applicant.techSkills}>
                        </textarea>
                        <br /><br />
                        <label>Short Personal Presentation
                            <span className="Opt">(optional)</span>
                            :</label>
                        <br />
                        <textarea
                            onChange={this.inputHandler}
                            name="shortPres"
                            className="ShortPresentation"
                            rows="2"
                            cols="40"
                            placeholder="Reason for joining the program..."
                            value={this.state.applicant.shortPres}>
                        </textarea>
                        <br />
                        <label className="StudyFromHomeLabel">
                            <input
                                onChange={this.checkChangeHandler}
                                type="checkbox"
                                name="studyFromHome"
                                value="Study from home"
                                checked={this.state.applicant.studyFromHome} />Study from home
                              <span className="Opt">
                                (optional)</span>
                        </label>
                        <br />
                        <input
                            type="submit"
                            className="SubmitBtn"
                            value={this.state.show ? 'Save' : "Submit"} />
                        {cancelBtn}
                        <p className="RequiredFields">* - fields requred</p>
                    </fieldset>
                </form>
            </React.Fragment>
        );
    };
}

Form.propTypes = {
    cancel: PropTypes.bool,
    editMode: PropTypes.bool,
    save: PropTypes.func,
    applicant: PropTypes.exact({
        name: PropTypes.string.isRequired,
        email: PropTypes.any.isRequired,
        age: PropTypes.number.isRequired,
        phoneNum: PropTypes.number.isRequired,
        prefWayOfComm: PropTypes.any.isRequired,
        englLevel: PropTypes.string.isRequired,
        availableToStart: PropTypes.string.isRequired,
        techSkills: PropTypes.string,
        shortPres: PropTypes.string,
        studyFromHome: PropTypes.bool,
    })
}


export default Form;
