import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Form.css';

import { checkValidity, updateObject } from '../../shared/utility';



class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicant: {
                name: {
                    value: props.name || '',
                    validation: {
                        required: true,
                        isName: true
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    value: props.email || '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false,
                },
                age: {
                    value: props.age || '',
                    validation: {
                        required: true,
                        isNumeric: true,
                        biggerThan: '18',
                        lessThan: '100'
                    },
                    valid: false,
                    touched: false,
                },
                phoneNum: {
                    value: props.phoneNum || '',
                    validation: {
                        required: true,
                        isNumeric: true,
                        minLength: 10,
                        maxLenght: 10
                    },
                    valid: false,
                    touched: false,
                },
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
            formIsValid: false,
            nameValid: true
        };
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.saveEditedApplicantHandler = this.saveEditedApplicantHandler.bind(this);
    }

    //Store form input values in state
    inputHandler = (e) => {
        // const updatedApplicant = { ...this.state.applicant };
        // updatedApplicant[e.target.name] = e.target.value;

        // const currentField = e.target.name;
        // console.log(currentField);
        let isValid = checkValidity(e.target.value, this.state.applicant[e.target.name].validation);
        const updatedField = updateObject(this.state.applicant[e.target.name], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.applicant[e.target.name].validation),
            touched: true
        });
        const updatedApplicant = { ...this.state.applicant }
        updatedApplicant[e.target.name] = updatedField;


        let formIsValid = true;

        formIsValid = updatedApplicant[e.target.name].valid && formIsValid;

        this.setState({ applicant: updatedApplicant, formIsValid: formIsValid });
    };

    //Check button state 
    checkChangeHandler = () => {
        const updatedApplicant = { ...this.state.applicant };
        updatedApplicant.studyFromHome = !this.state.applicant.studyFromHome;
        this.setState({ applicant: updatedApplicant });
    };

    submit = (e) => {
        e.preventDefault();
        if (this.state.formIsValid) {
            this.props.submit(this.state.applicant)
        } else {

        }
    }

    saveEditedApplicantHandler = (e) => {
        e.preventDefault();
        let appState = this.state.applicant;
        this.props.save(appState)
    }

    render() {
        // let invalidClasses = {

        // }
        let formClasses = this.state.editMode ? 'MainForm FormForEdit' : 'MainForm';
        let cancelBtn = this.state.editMode ? <input type="submit" className="CancelBtn" value='Cancel' onClick={this.cancel} /> : null;
        // let invalidMessage = this.state.formIsValid ? null : <p className='Invalid'>Please fill all the required fields with valid information</p>
        return (
            <React.Fragment>
                <form className={formClasses} onSubmit={this.state.editMode ? this.saveEditedApplicantHandler : this.submit}>
                    <fieldset>
                        <legend className='Student'>{this.state.editMode ? 'Edit Student Info' : 'Add Student'}</legend>
                        <label>Name *:</label><br />
                        <input
                            className={(!this.state.applicant.name.valid && !this.state.applicant.name.touched) || this.state.applicant.name.valid ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            type="text"
                            name="name"
                            placeholder="Enter student name..."
                            value={this.state.applicant.name.value} />
                        <br />
                        <label>Email *:</label><br />
                        <input
                            className={(!this.state.applicant.email.valid && !this.state.applicant.email.touched) || this.state.applicant.email.valid ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            type="email"
                            name="email"
                            placeholder="Enter e-mail..."
                            value={this.state.applicant.email.value} />
                        <br />
                        <label>Age *:</label><br />
                        <input
                            className={(!this.state.applicant.age.valid && !this.state.applicant.age.touched) || this.state.applicant.age.valid ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            type="number"
                            name="age"
                            placeholder="Enter student age..."
                            value={this.state.applicant.age.value} />
                        <br />
                        <label>Phone Number *:</label><br />
                        <input
                            className={!this.state.applicant.phoneNum.valid && !this.state.applicant.age.touched ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            className="PhoneNumber"
                            type="number"
                            name="phoneNum"
                            placeholder="Enter Phone 08..."
                            value={this.state.applicant.phoneNum.value} />

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
    cancel: PropTypes.func,
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
