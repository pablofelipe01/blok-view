import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap'


const Metadata = props => {

    const [metaData, changeMeteData]=useState({})

    useEffect(() => {
        async function getData() {
            let Data = await window.account.state()
            console.log(Data)
            changeMeteData(Data)
        }
        getData()
    }, [])
    return (
        <div>
            
        </div>
    );
};



export default Metadata;