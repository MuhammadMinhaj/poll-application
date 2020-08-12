import React,{ Component } from 'react'
import { Modal,ModalHeader,ModalBody } from 'reactstrap'
import ParticipationForm from './participate-form'
import PollForm from '../poll-form/index'

class Content extends Component{

    state = {
        openModal:false 
    }

    toggleModal = ()=>{
        this.setState({
            openModal:!this.state.openModal
        })
    }
    render(){
        if(Object.keys(this.props.poll).length===0){
            return (
                <div>
                    <h3>Welcome To My Application</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, natus similique voluptatibus amet illo necessitatibus tempore ipsa totam aliquid perferendis dolorem. Esse eveniet nisi excepturi sit cupiditate minima labore reprehenderit!
                    </p>
                </div>
            )
        }
        const { poll,getOpinion,updatePoll,deletePoll } = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br/>
                <ParticipationForm
                    poll={poll}
                    getOpinion={getOpinion}
                    toggleModal={this.toggleModal}
                    deletePoll={deletePoll}
                />
                <Modal isOpen={this.state.openModal} toggle={this.toggleModal} unmountOnClose={true}>
                    <ModalHeader toggle={this.toggleModal}>
                        Update Modal
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                            poll={poll}
                            submit={updatePoll}
                            buttonValue='Update Poll'
                            isUpdate={true}
                        />
                    </ModalBody>                
                </Modal>
            </div>  
        )
    }
}

export default Content