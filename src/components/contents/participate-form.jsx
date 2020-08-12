import React,{ Component } from 'react'

import { Form,FormGroup,FormFeedback,Input,CustomInput,Label,Button } from 'reactstrap' 

class ParticipationForm extends Component{
    state = {
        name:'',
        selectedOption:'',
        errors:{}
    }
    handleChange = event=>{
        this.setState({
            [event.target.name]:event.target.value 
        })
    }
    handleSubmit = event=>{
        event.preventDefault()

        let { errors,isValid } = this.validate()

        if(isValid){
            this.props.getOpinion({
                poll:this.props.poll,
                pollId:this.props.poll.id,
                name:this.state.name,
                selectedOption:this.state.selectedOption
            })
            event.target.reset()
            this.setState({
                name:'',
                selectedOption:'',
                errors:{}
            })
        }else{
            this.setState({errors})
        }
    }
    validate = ()=>{
        const errors = {} 
        if(!this.state.name){
            errors.name = 'Please Provied Name'
        }else if (this.state.name.length>20){
            errors.name = 'Name Too Long'
        }

        if(!this.state.selectedOption){
            errors.selectedOption = 'Please Select One Options'
        }

        return ({
            errors,
            isValid:Object.keys(errors).length===0
        })
    }
    render(){
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="d-flex pb-2 border-bottom justify-content-between">
                    <h4>Options</h4>
                    <div>
                    <Button 
                        type="Button"
                        color="warning" 
                        onClick={this.props.toggleModal}
                        className="mr-1"
                        >Edit
                    </Button>

                    <Button
                        type="button"
                        color="danger"
                       
                        onClick={()=>this.props.deletePoll(this.props.poll.id)}
                        >
                        Delete
                    </Button>
                    </div>

                </div>
                {
                    this.props.poll.options.map(opt=>(
                        <FormGroup className="my-2" key={opt.id}>
                            <Label className="d-flex">
                                <CustomInput type="radio" id={opt.id} name="selectedOption" value={opt.id} onChange={this.handleChange} invalid={this.state.errors.selectedOption?true:false} />
                         
                            {opt.value}
                            <span 
                                style={{
                                    padding:'5px 20px',
                                    color:'white',
                                    borderRadius:'5px',
                                    background:'green'
                                }}
                                className="ml-auto"
                            >
                                {opt.vote}
                            </span>
                            <span
                                style={{
                                    padding:'5px 20px',
                                    color:'white',
                                    borderRadius:'5px',
                                    background:'orange'
                                }}
                                className="ml-2"
                            >
                                {this.props.poll.totalVote>0?((100*opt.vote)/this.props.poll.totalVote).toFixed(2):0}
                                %
                            </span>
                               </Label>
                        </FormGroup>
        ))
                }                      
                <FormGroup className="my-3">
                        <Label>Enter Your Name</Label>
                        <Input
                        
                            name="name"
                            placeholder="Enter Your Name"
                            value={this.state.value}
                            onChange={this.handleChange}
                            invalid={this.state.errors.name?true:false}
                        />
                        {this.state.errors.name&& <FormFeedback>{this.state.errors.name}</FormFeedback>}
                </FormGroup>
                <Button type="submit">Submit Your Opinion</Button>
            </Form>
        )
    }
}

export default ParticipationForm