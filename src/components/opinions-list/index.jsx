import React from 'react'

import { ListGroup,ListGroupItem } from 'reactstrap'


// opinions: Array(1)
// 0: {id: "u5ZHOCzdT", name: "asssssssss", selectedOption: "SDHGDFH"}


// options: Array(2)
// 0: {id: "DGHDFHFD", value: "C-Programming", vote: 0}
// 1: {id: "SDHGDFH", value: "Javascript", vote: 1}

const opinionsInfo = (options,optID)=>{
    let opt = options.find(o=>o.id===optID)  
    return opt     
}

const OpinionsList = ({polls})=>(
    <ListGroup>
        { polls.opinions && polls.opinions.map(o=>(
            <ListGroupItem key={o.id}>
                <div className="d-flex justify-content-between">
                    <span>
                        {o.name} 
                    </span>
                    
                    <span>
                        {opinionsInfo(polls.options,o.selectedOption).value}
                    </span>
                </div>
            </ListGroupItem>
        )) }
       
    </ListGroup>
)

export default OpinionsList