import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Form.css';

import { checkValidity, updateObject } from '../../shared/utility';
import axios from '../../axios';



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
                        biggerThan: '18'
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
                        maxLength: 10
                    },
                    valid: false,
                    touched: false,
                },
                prefWayOfComm: {
                    value: props.prefWayOfComm || '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                englLevel: {
                    value: props.englLevel || '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                availableToStart: {
                    value: props.availableToStart || '',
                    validation: {
                        required: true,
                        isDate: true
                    },
                    valid: false,
                    touched: false,
                },
                techSkills: {
                    value: props.techSkills || '',
                    validation: { required: false },
                    valid: true
                },
                shortPres: {
                    value: props.shortPres || '',
                    validation: { required: false },
                    valid: true
                },
                studyFromHome: {
                    value: props.studyFromHome || false,
                    validation: { required: false },
                    valid: true
                },
                id: props.id || ''
            },
            cancel: props.cancel,
            editMode: props.show,
            save: props.save,
            formIsValid: false,
            errorSubmit: false,
            dublicateEmail: false,
            dublicatePhone: false,
            applicants: []
        };
        this.checkDublicateStudentEmailPhone = this.checkDublicateStudentEmailPhone.bind(this);
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.saveEditedApplicantHandler = this.saveEditedApplicantHandler.bind(this);
    }

    componentDidMount() {
        axios.get('/applicants.json')
            .then(res => {
                const fetchedApplicants = [];
                for (let key in res.data) {
                    fetchedApplicants.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ applicants: fetchedApplicants })
            })
            .catch(error => { console.log('something went wrong on get') }
            )
    }

    //Store form input values in state
    inputHandler = (e) => {
        const updatedField = updateObject(this.state.applicant[e.target.name], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.applicant[e.target.name].validation),
            shouldValidate: !checkValidity(e.target.value, this.state.applicant[e.target.name].validation),
            touched: true
        });
        const updatedApplicant = { ...this.state.applicant }
        updatedApplicant[e.target.name] = updatedField;

        this.setState({ applicant: updatedApplicant });
    };

    //Check button state 
    checkChangeHandler = () => {
        const updatedApplicant = { ...this.state.applicant };
        updatedApplicant.studyFromHome.value = !this.state.applicant.studyFromHome.value;
        this.setState({ applicant: updatedApplicant });
    };

    checkDublicateStudentEmailPhone = () => {
        let updatedEmail = false;
        let updatedPhone = false;
        this.state.applicants.map(arrApplicant => {
            if (arrApplicant.email.value === this.state.applicant.email.value) {
                updatedEmail = true;
            } else if (arrApplicant.phoneNum.value === this.state.applicant.phoneNum.value) {
                updatedPhone = true;
            }
            return this.setState({ dublicatePhone: updatedPhone, dublicateEmail: updatedEmail });
        });

    }

    submit = (e) => {
        e.preventDefault();
        const applicant = { ...this.state.applicant }
        let formIsValid = true;
        for (var fields in applicant) {
            if (applicant.hasOwnProperty(fields) && fields !== 'id') {
                formIsValid = applicant[fields].valid && formIsValid;
            }
        }
        if (formIsValid && this.state.dublicateEmail === false && this.state.dublicatePhone === false) {
            this.props.submit(applicant);

            //Reset form fields
            axios.get('/applicant/form.json')
                .then(res => {
                    let clearForm = {};
                    for (let key in res.data) {
                        clearForm = res.data[key];
                    }
                    this.setState({ applicant: clearForm });
                })
                .catch(error => { console.log('something went wrong on componentDidUpdate') }
                );
            this.setState({ errorSubmit: false });
        } else {
            this.setState({ errorSubmit: true });
        }

    }

    saveEditedApplicantHandler = (e) => {
        e.preventDefault();
        const updatedApplicant = { ...this.state.applicant }
        let formIsValid = true;
        for (var fields in updatedApplicant) {
            if (updatedApplicant.hasOwnProperty(fields) && fields !== 'id') {
                formIsValid = (updatedApplicant[fields].valid && formIsValid) || (!updatedApplicant[fields].touched && formIsValid);
            }
        }

        if (formIsValid) {
            let appState = this.state.applicant;
            this.props.save(appState)
            this.setState({ errorSubmit: false });
        } else {
            this.setState({ errorSubmit: true });
        }
    }

    render() {
        let formClasses = this.state.editMode ? 'MainForm FormForEdit' : 'MainForm';
        let cancelBtn = this.state.editMode ? <input type="submit" className="CancelBtn" value='Cancel' onClick={this.state.cancel} /> : null;
        let invalidMessage = !this.state.errorSubmit ? null : <p className='Invalid'>Please fill all the required fields with valid information</p>
        let dublicateEmail = !this.state.dublicateEmail || (!this.state.dublicateEmail && this.state.editMode) ? <label>Email *</label> : <label className='Invalid'>Email exists *</label>
        let dublicatePhone = !this.state.dublicatePhone || (!this.state.dublicatePhone && this.state.editMode) ? <label>Phone Number *</label> : <label className='Invalid'>Phone Number exists *</label>
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
                        {dublicateEmail}<br />
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
                        {dublicatePhone}<br />
                        <input
                            className={(!this.state.applicant.phoneNum.valid && !this.state.applicant.phoneNum.touched) || this.state.applicant.phoneNum.valid ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            type="text"
                            name="phoneNum"
                            placeholder="Enter Phone 08..."
                            value={this.state.applicant.phoneNum.value} />
                        <p className={(!this.state.applicant.prefWayOfComm.valid && !this.state.applicant.prefWayOfComm.touched) || this.state.applicant.prefWayOfComm.valid ? 'Valid' : 'Invalid'}>Preferred Way of Communication *</p>
                        <div className="EmailRadio">
                            <label>
                                <input
                                    onChange={this.inputHandler}
                                    type="radio"
                                    name="prefWayOfComm"
                                    value="Email"
                                    checked={this.state.applicant.prefWayOfComm.value === 'Email'} />E-mail
                                 </label>
                        </div>
                        <div className="PhoneRadio">
                            <label>
                                <input
                                    onChange={this.inputHandler}
                                    type="radio"
                                    name="prefWayOfComm"
                                    value="Phone"
                                    checked={this.state.applicant.prefWayOfComm.value === 'Phone'} />Phone
                                   </label>
                        </div>
                        <label className={(!this.state.applicant.englLevel.valid && !this.state.applicant.englLevel.touched) || this.state.applicant.englLevel.valid ? 'Valid' : 'Invalid'}>English Level *</label>
                        <br />
                        <select
                            onChange={this.inputHandler}
                            name='englLevel'
                            value={this.state.applicant.englLevel.value ? this.state.applicant.englLevel.value : '-- select --'}>
                            <option name='' value="">-- select --</option>
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
                            className={(!this.state.applicant.availableToStart.valid && !this.state.applicant.availableToStart.touched) || this.state.applicant.availableToStart.valid ? 'Valid' : 'Invalid'}
                            onChange={this.inputHandler}
                            type="date"
                            name="availableToStart"
                            value={this.state.applicant.availableToStart.value ? this.state.applicant.availableToStart.value : 'set date'} />
                        <br />
                        <label>Technical Skills and Courses <span className="Opt">(optional)</span>:</label>
                        <br />
                        <textarea
                            onChange={this.inputHandler}
                            name="techSkills"
                            className="TechSkills"
                            rows="2" cols="40"
                            placeholder="Enter info..."
                            value={this.state.applicant.techSkills.value}>
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
                            value={this.state.applicant.shortPres.value}>
                        </textarea>
                        <br />
                        <label className="StudyFromHomeLabel">
                            <input
                                onChange={this.checkChangeHandler}
                                type="checkbox"
                                name="studyFromHome"
                                value="Study from home"
                                checked={this.state.applicant.studyFromHome.value === 'Yes' ? true : null} />Study from home
                              <span className="Opt">
                                (optional)</span>
                        </label>
                        <br />
                        <input
                            type="submit"
                            className="SubmitBtn"
                            onClick={this.checkDublicateStudentEmailPhone}
                            value={this.state.show ? 'Save' : "Submit"} />
                        {cancelBtn}
                        <p className="RequiredFields">* - fields requred</p>
                        {invalidMessage}
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
