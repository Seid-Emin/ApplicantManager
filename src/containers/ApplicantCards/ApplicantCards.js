import React, { Component } from 'react';
import axios from '../../axios';

import ApplicantCard from '../../components/ApplicantCard/ApplicantCard';
import './ApplicantCards.css';


class ApplicantCards extends Component {
    state = {
        applicants: [],
        clickedApplicantDeleteBtn: null,
        addedApplicantId: null,
        loadedApplicants: [],
        editMode: false,
        applicant: null,
        deletedApplicant: false,
        editedApplicant: false,
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
    };

    componentDidUpdate() {
        if (this.props.addedApplicantId) {
            // console.log('ApplicantCards ComponentDidUpdate');
            if (!this.state.addedApplicantId || (this.state.addedApplicantId && this.state.addedApplicantId.id !== this.props.addedApplicantId)) {
                axios.get('/applicants/' + this.props.addedApplicantId + '.json')
                    .then(res => {
                        if (this.props.addedApplicantId !== this.state.addedApplicantId) {
                            const fetchedApplicants = [...this.state.applicants];
                            fetchedApplicants.push({
                                ...res.data,
                                id: this.props.addedApplicantId
                            });
                            this.setState({
                                applicants: fetchedApplicants, addedApplicantId: this.props.addedApplicantId,
                                deletedApplicant: false
                            });
                        }
                    })
                    .catch(error => { console.log('something went wrong on componentDidUpdate') }
                    );
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state.applicant);
        if (this.state.applicant === null
            && this.props.submited === nextProps
            && this.state.deletedApplicant === nextState.deletedApplicant
            && this.state.editedApplicant === nextState.editedApplicant) {
            //console.log(this.state.deletedApplicant + ' dont update from ApplicantCards: ' + nextState.deletedApplicant);
            //console.log('ApplicantCards shouldCompUpdate false');
            console.log(this.state + 'from False');

            return false;
        } else {
            console.log(this.state + 'from True');
            // console.log(this.state.deletedApplicant + ' update from ApplicantCards: ' + nextState.deletedApplicant)
            // console.log('ApplicantCards shouldCompUpdate true');
            // this.setState({ deletedApplicant: false })
            return true;

        }
    }

    // componentDidUpdate() {

    // }

    //Get form data stored in the state and pass it to server
    submitHandler = (submitedApplicant) => {
        //const data = this.state.applicant;
        axios.post('/applicants.json', submitedApplicant)
            .then(response => {
                this.setState({ submited: true });
            })
            .catch(error => console.log(error));
    }

    deleteApplicantHandler = (id) => {
        axios.delete('/applicants/' + id + '.json')
            .then(res => {
                this.setState({ deletedApplicant: true });
                const appArr = this.state.applicants
                const appIndex = appArr.findIndex(applicant => {
                    return applicant.id === id
                })
                appArr.splice(appIndex, 1);
                this.setState({ applicants: appArr });
            })
            .catch(error => {
                console.log('somethink went wrong on deleting');
            })
    }



    saveEditedApplicantHandler = (editedApplicant) => {
        const updatedApplicants = [...this.state.applicants];
        const indexOfEditeApplicant = updatedApplicants.findIndex(applicant => {
            return applicant.id === editedApplicant.id
        });
        updatedApplicants[indexOfEditeApplicant] = editedApplicant;
        this.setState({
            applicants: updatedApplicants,
            editedApplicant: true
        })
    }



    render() {

        let applicantCard = this.state.applicants ?
            this.state.applicants.map(applicant => (
                <ApplicantCard
                    key={applicant.id}
                    id={applicant.id}
                    name={applicant.name}
                    email={applicant.email}
                    age={applicant.age}
                    phoneNum={applicant.phoneNum}
                    prefWayOfComm={applicant.prefWayOfComm}
                    englLevel={applicant.englLevel}
                    availableToStart={applicant.date}
                    techSkills={applicant.techSkills}
                    shortPres={applicant.shortPres}
                    studyFromHome={applicant.studyFromHome}
                    delete={() => this.deleteApplicantHandler(applicant.id)
                    }
                    clicked={() => this.clickedApplicant(applicant.id)}
                    onApplicantSave={this.saveEditedApplicantHandler}
                    editedApplicant={this.state.editedApplicant}

                    submit={this.submitHandler}
                />
            )) : null;


        return (
            <React.Fragment>

                <div className="StudentInfoOutput">
                    <div className="Info-content-wrapper">
                        <div className="CardWr">
                            <div className="CardsWrap">
                                {applicantCard}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ApplicantCards;
