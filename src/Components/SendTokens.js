import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, ListGroup, Button, Table } from 'react-bootstrap';

const SendTokens = props => {
         
    const [recipients, setRecipients] = useState([])
    const [valuesSent, setValues] = useState([])
    const [balance, changeBalance] = useState(0)

    let ValueInput=React.createRef()
    let Recipient=React.createRef()

    const sendGift=async() => {
        let getState=await window.account.state()
        let getAmount=await window.utils.format.formatNearAmount(getState.amount)
        let enteredValue=ValueInput.current.value 

        if (Number(getAmount)>Number(enteredValue)){
            await window.account.sendMoney(Recipient.current.value, window.utils.format.parseNearAmount(enteredValue))
            .then(
                await window.contract.addFunds({recipient:Recipient.current.value, amount:Number(enteredValue)})
            )
            .then(
                setRecipients(
                    await window.contract.getNames({User:window.accountId})

                )
            )
            .then(
                setValues(
                    await window.contract.getValues({User:window.accountId})
                )
            )
        }else{
            alert('Not enough funds')
        }
    }

    useEffect(() => {
        async function getData(){
            let Data = await window.account.state()
            changeBalance(Data.amount)
        }
        getData()
    }, [balance])

    useEffect(() => {
        async function getTransactions() {
            setRecipients(
                await window.contract.getNames({User:window.accountId})
            )
            setValues(
                await window.contract.getValues({User:window.accountId})
            )
        }

        getTransactions()
    }, [])

    const formatOutput=(text)=>{
        text = String(text)
        if (text.includes('.')) {
            let arr=text.split('.')

            arr[1]=arr[1].split('').splice(0,2).join('')
            console.log(arr)
            return arr.join('.')
        }else{
            return text
        }
    }

    return (
       <Container>
           <Row className = "d-flex justify-content-center">
               <Card>
                    <Card.Header>Near Token Balance</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{formatOutput(window.utils.format.formatNearAmount(String(balance)))} Near</ListGroup.Item>
                    </ListGroup>
               </Card>


           </Row>

           <Row className = "d-flex justify-content-center">
                <Card>
                    <Card.Header>Send Money</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                <input type='text' placeholder='Enter Recipient' ref={Recipient}/>
                                <input type='text' placeholder='Enter Value' ref={ValueInput} />
                                </Col>
                                <Col>
                                <Button onClick={sendGift}>Submit</Button>
                                </Col>
                            </Row>
                            <Row className = "d-flex justify-content-center">
                                <Table style = {{marginTop:'10px'}} striped bordered hover variant='dark'>
                                    <thead>
                                        <tr>
                                            <th colSpan = "2">Transaction History</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                           recipients.map((x,index)=>{
                                               return (
                                                   <tr key={x}>
                                                       <td>{x}</td>
                                                       <td> {`${valuesSent[index]} Near`} </td>
                                                   </tr>
                                               )
                                           })
                                       }
                                    </tbody>

                                </Table>

                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
           </Row>
       </Container>
    );
};

SendTokens.propTypes = {
    
};

export default SendTokens;