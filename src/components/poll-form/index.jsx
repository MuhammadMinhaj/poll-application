import React,{Component} from 'react'
import shortid from 'shortid'

import Form from './form'

const defaultOptions = [
    {id:shortid.generate(),value:'',vote:0},
    {id:shortid.generate(),value:'',vote:0}
]
class PollForm extends Component{
    state={
        title:'',
        description:'',
        options:defaultOptions,
        errors:{}
    }
    componentDidMount(){
        const { poll } = this.props 
        if(poll&&Object.keys(poll).length>0){
            this.setState({
                title:poll.title,
                description:poll.description,
                options:poll.options,
    
            })
        }
    }
    handleChange = event =>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleOptionChange = (event,index)=>{
        const {options} = this.state
        options[index].value = event.target.value 
        this.setState({options})
    }
    createOption = ()=>{
        const { options } = this.state
        if(options.length<5){
            options.push({
                id:shortid.generate(),
                value:'',
                vote:0
            })
            this.setState({options})
        }else{
            alert('You can create maximum five options')
        }
    }
    deleteOption = (index)=>{
        const { options } = this.state
        if(options.length>2){
            options.splice(index,1)
            this.setState({options})
        }else{
            alert('You must have at least tow options')
        }
    }
    handleSubmit = event=>{
        event.preventDefault()

        const { isValid,errors } = this.validate()
        if(!isValid){
            const { title,description,options } = this.state
            let poll = {
                title,
                description,
                options
            }
            if(this.props.isUpdate){
                poll.id = this.props.poll.pollId
                this.props.submit(poll)
                alert('Updated Successful')
            }else{
                this.props.submit(poll)

                event.target.reset() 
                this.setState({
                    title:'',
                    description:'',
                    options:[],
                    errors:{}
                })
            }

        }else{
            this.setState({errors})
        }
    }
    validate = ()=>{
        let errors = {}
        let { title,description,options } = this.state
        if(!title){
            errors.title = 'Please provied title'
        }else if(title.length<20){
            errors.title = 'Title Too Short'
        }else if(title.length>100){
            errors.title = 'Title Too Long'
        }

        if(!description){
            errors.description = 'Please Provied Description'
        }else if (description>500){
            errors.description = 'Description Too Long'
        }

        let optionsErrors = []

        options.forEach((opt,index)=>{
            if(!opt.value){
                optionsErrors[index] = 'Option Text Empty'
            }else if (opt.value.length>100){
              
                optionsErrors[index] = 'Option Too Long'
            }
        })

        if(optionsErrors.length>0){
            errors.options = optionsErrors
        }

        return (
            {
                errors,
                isValid:Object.keys(errors).length===0?false:true 
            }
        )
    }
    render(){
        const { title,description,options,errors } = this.state
        return(
           <Form
                title = {title}
                description = {description}
                options = {options}
                errors = {errors}
                buttonValue = {this.props.buttonValue||'Create Poll'}
                handleChange = {this.handleChange}
                handleOptionChange = {this.handleOptionChange}
                createOption = {this.createOption}
                deleteOption = {this.deleteOption}
                handleSubmit = {this.handleSubmit}
           />
        )
    }
}

export default PollForm 