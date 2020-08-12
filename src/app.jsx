import React,{ Component } from 'react'
import { Container,Row,Col } from 'reactstrap'
import shortid from 'shortid'

import Content from './components/contents/index'
import Sidebar from './components/sidebar/index'
import OpinionsList from './components/opinions-list/index'


import POLLS from './data/poll'

class App extends Component{
    state = {
        polls:[],
        selectedPoll:{},
        searchTerm:''
    }
    componentDidMount(){
        this.setState({
            polls:POLLS 
        })
    }
    addNewPoll = poll=>{
        poll.id = shortid.generate()
        poll.created = new Date()
        poll.totalVote = 0
        poll.opinions = []
        this.setState({
            polls:this.state.polls.concat(poll)
        })
    }
    updatePoll = updatedPoll=>{
        let polls = [...this.state.polls]
        let poll = this.state.polls.find(p=>p.pollId===updatedPoll.id)

        poll.title = updatedPoll.title
        poll.description = updatedPoll.description
        poll.options = updatedPoll.options
        this.setState({polls})
    }
    deletePoll = deletedPoll=>{
        let polls = this.state.polls.filter(p=>p.id!==deletedPoll)
        this.setState({polls,selectedPoll:{},searchTerm:''})
    }
    selectPoll = pollId=>{
        let poll = this.state.polls.find(p=>p.id===pollId)

        this.setState({selectedPoll:poll})
    } 
    handleSearch = term=>{
        this.setState({searchTerm:term})
    }

    performSearch = ()=>{
        return this.state.polls.filter(p=>p.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    getOpinion = response=>{
        const { polls } = this.state 
        const poll = polls.find(p=>p.id===response.poll.id)
        const option = poll.options.find(o=>o.id===response.selectedOption)
      
     
        poll.totalVote++
        option.vote++
        const opinion = {
            id:shortid.generate(),
            name:response.name,
            selectedOption:response.selectedOption
        }
        poll.opinions.push(opinion)
        this.setState(polls)
    }
   
    render(){
        const polls = this.performSearch()
        return (
            <Container className="my-5">
                <Row>
                    <Col md={4}>
                        <Sidebar 
                        polls={polls}
                         searchTerm={this.state.searchTerm} 
                         selectPoll={this.selectPoll} 
                         handleSearch={this.handleSearch}
                        addNewPoll = {this.addNewPoll}
                         />
                    </Col>
                    <Col md={8}>
                        <Content 
                            poll={this.state.selectedPoll}
                            getOpinion ={this.getOpinion}
                            updatePoll={this.updatePoll}
                            deletePoll={this.deletePoll}

                        />
                        {this.state.selectedPoll.opinions&&<h4 className="my-2">Total Vote :</h4>} 
                        <OpinionsList polls={this.state.selectedPoll} />
                        
                    </Col>
                   
                       
                       
                   
                </Row>
            </Container>    
        )
    }
}

export default App