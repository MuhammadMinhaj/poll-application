import React from 'react'
import { Form,FormGroup,Label,Input,Button,FormFeedback } from 'reactstrap'

const FormComponent = ({
    title,
    description,
    options,
    errors,
    buttonValue,
    handleChange,
    handleOptionChange,
    createOption,
    deleteOption,
    handleSubmit
})=>(
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="title">Title</Label>
            <Input
                name="title"
                id="title"
                value={title}
                onChange={handleChange}
                invalid={errors.title?true:false}
                placeholder="title"
            />
            {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
        </FormGroup>
        <FormGroup>
            <Label for="description">Description</Label>
            <Input
                name="description"
                id="description"
                value={description}
                onChange={handleChange}
                invalid={errors.description?true:false}
                placeholder="Describe Your Poll"
            />
            {errors.description&&<FormFeedback>{errors.description}</FormFeedback>}
        </FormGroup>
        <FormGroup>
            <Label>Enter Option</Label>
            <span
                style={{
                    marginLeft:'30px',
                    background:'green',
                    color:'white',
                    padding:'5px',
                    borderRadius:'5px',
                    cursor:'pointer'
                }}
                onClick={createOption}
            >
                Add Options
            </span>
            {options.map((opt,index)=>(
                <div key={opt.id} className="d-flex my-2">
                    <Input
                        value={opt.value}
                        onChange={e=>handleOptionChange(e,index)}
                        invalid = {errors.options&& errors.options[index]?true:false}
                    />
                    <Button
                        color='danger'
                        disabled={options.length<=2?true:false}
                        className="ml-2"
                        onClick={()=>deleteOption(index)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </FormGroup>
            <Button type="submit" color="primary">{buttonValue}</Button>
    </Form>
)

export default FormComponent