import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const FunctionCall = props => {

    const [FunctionCallKeys, changeKeys]=useState([])

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

    useEffect(() => {
        async function getKeys() {
            let keyArr = await window.account.getAccessKeys()
            let counter = 0 
            let OutputArr = keyArr.map((x, index) => {
                if (x.access_key.permission !== 'FullAccess') {
                    counter = counter+1
                    return (
                        <tr key={counter}>
                            <td>{counter}</td>
                            <td>{x.public_key}</td>
                            <td>{x.access_key.nonce}</td>
                            <td>{formatOutput(window.utils.format.formatNearAmount(x.access_key.permission.FunctionCall.allowance))} </td>
                        </tr>
                    )
                }
            })
            changeKeys(
                OutputArr
            )
        }
        getKeys()
    },[])

    return (
        <div>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th colSpan>Function Call Key Pairs</th>
                    </tr>
                </thead>

                <thead>
                    <tr>
                        <th></th>
                        <th>Public Key Pairs</th>
                        <th>Nonce</th>
                        <th>Allowance</th>
                    </tr>
                </thead>

                <tbody>
                    {FunctionCallKeys.map(x=>{return x})}
                </tbody>

            </Table>
            
        </div>
    );
};



export default FunctionCall;