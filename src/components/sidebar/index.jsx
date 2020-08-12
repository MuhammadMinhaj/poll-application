import React,{ Component } from 'react'
import { Input,Button,Modal,ModalHeader,ModalBody } from 'reactstrap'
import PollList from './poll-list'
import PollForm from '../poll-form/index'
class Sidebar extends Component{
    state = {
        isOpen:false 
    }
    toggleModal = ()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
    render(){
        return (
            <div className="app" style={{background:'#efefef',padding:'10px'}}>
                <div className="d-flex mb-5">
                    <Input
                        type="search"
                        placeholder="Search..."
                        onChange={e=>{this.props.handleSearch(e.target.value)}}
                        value={this.props.searchTerm}
                    />
                    <Button
                        color="success"
                        className="ml-2"
                        onClick={this.toggleModal}
                    >New</Button>
                </div>
                <h3>List Of Poll</h3>
                <hr/>
                <PollList polls={this.props.polls} selectPoll={this.props.selectPoll}/>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} unmountOnClose={true}>
                    <ModalHeader toggle={this.toggleModal}>
                        Create A New Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm submit={this.props.addNewPoll}/>
                    </ModalBody>
                </Modal>
            </div>  
        )
    }
}

export default Sidebar