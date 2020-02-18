import React, { Component } from 'react';
import Backdrop from '../IU/Backdrop/Backdrop';
import Form from '../Form/Form';
import axios from '../../axios';

import './ApplicantCard.css';

class ApplicantCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicant: {
                name: props.name,
                email: props.email,
                age: props.age,
                phoneNum: props.phoneNum,
                prefWayOfComm: props.prefWayOfComm,
                englLevel: props.englLevel,
                availableToStart: props.availableToStart,
                techSkills: props.techSkills,
                shortPres: props.shortPres,
                studyFromHome: props.studyFromHome,
                id: props.id,
            },
            editedApplicant: props.editedApplicant,
            delete: props.delete,
            editMode: false,
            save: props.onApplicantSave,
        };
        this.saveEditedApplicantHandler = this.saveEditedApplicantHandler.bind(this);
    }

    saveEditedApplicantHandler = (e) => {
        e.preventDefault();
        let appState = this.state.applicant
        this.props.onApplicantSave(appState)

    }

    deleteApplicant = () => {
        this.props.delete(this.state.applicant.id)
    }

    editApplicantHandler = () => {
        this.setState({
            editMode: true
        });
    }



    cancelEditHandler = () => {
        this.setState({ editMode: false })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.editedApplicant !== nextState.editedApplicant && this.props.id === nextProps.id && this.props.editMode === nextState.editMode) {
            console.log('card shouldComponentUpdate from false');
            return false;
        } else {
            console.log('card shouldComponentUpdate from true');
            return true;
        }
    }

    // componentDidUpdate() {
    //     this.setState(applicant);
    // }
    render() {
        let thisStateApplicant = this.state.applicant
        let editModeForm = this.state.editMode ?
            <Form
                name={thisStateApplicant.name}
                email={thisStateApplicant.email}
                age={thisStateApplicant.age}
                phoneNum={thisStateApplicant.phoneNum}
                prefWayOfComm={thisStateApplicant.prefWayOfComm}
                englLevel={thisStateApplicant.englLevel}
                availableToStart={thisStateApplicant.availableToStart}
                techSkills={thisStateApplicant.techSkills}
                shortPres={thisStateApplicant.shortPres}
                studyFromHome={thisStateApplicant.studyFromHome}
                id={thisStateApplicant.id}
                show={this.state.editMode}
                save={this.state.save}
                cancel={this.cancelEditHandler}

                submit={this.props.submit}
            />
            : null
        return (
            < React.Fragment >
                <Backdrop
                    show={this.state.editMode}
                    clicked={this.cancelEditHandler} />
                {editModeForm}
                <div className="StudentCart ">
                    <table className="StudentCart__wrapper">
                        <tbody className="StudentCart__wrapper-body">
                            <tr className="StudentCart__wrapper-body-row" >
                                <td className="Student-info-title">Name:</td>
                                <td className="NameCart" name="nameCart">{this.state.applicant.name}</td>
                            </tr>
                            <tr className="StudentCart__wrapper-body-row">
                                <td className="Student-info-title">E-mail:</td>
                                <td className="EmailCart" name="emailCart">{this.state.applicant.email}</td>
                            </tr>
                            <tr className="StudentCart__wrapper-body-row" >
                                <td className="Student-info-title">Age:</td>
                                <td className="phoneNumCart" name="phoneNumCart">{this.state.applicant.age}</td>
                            </tr>
                            <tr className="studentCart__wrapper-body-row" >
                                <td className="Student-info-title">Phone Number:</td>
                                <td className="phoneNumCart" name="phoneNumCart">{this.state.applicant.phoneNum}</td>
                            </tr>
                            <tr className="studentCart__wrapper-body-row" >
                                <td className="Student-info-title">Preferred Way of Communication:</td>
                                <td className="PrefNameCart" name="prefNameCart">{this.state.applicant.prefWayOfComm}</td>
                            </tr>
                            <tr className="studentCart__wrapper-body-row" >
                                <td className="Student-info-title">English Level:</td>
                                <td className="EnglLevelCart" name="englLevelCart">{this.state.applicant.englLevel}</td>
                            </tr>
                            <tr className="studentCart__wrapper-body-row" >
                                <td className="Student-info-title">Available to Start:</td>
                                <td className="DateCart" name="dateCart" >{this.state.applicant.availableToStart}</td>
                            </tr>
                            <tr className="StudentCart__wrapper-body-row" >
                                <td className="Student-info-title">Technical Skills and Courses:</td>
                                <td className="TechSkillsCart" name="techSkillsCart">{this.state.applicant.techSkills}</td>
                            </tr>
                            <tr className="StudentCart__wrapper-body-row" >
                                <td className="Student-info-title">Short Personal Presentation:</td>
                                <td className="ShortPresentationCart" name="shortPresentationCart">{this.state.applicant.shortPres}</td>
                            </tr>
                            <tr className="StudentCart__wrapper-body-row" >
                                <td className="Student-info-title">Study from home:</td>
                                <td className="StudyFromHomeCart" name="studyFromHomeCart">{this.state.applicant.studyFromHome ? 'Yes' : null}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="DeleteBtn" onClick={() => this.state.applicant.delete(this.state.applicant.id)}>x</button>
                    <button className="EditBtn" onClick={this.editApplicantHandler}>Edit</button>
                </div>
            </React.Fragment >
        )
    }
}



export default ApplicantCard;