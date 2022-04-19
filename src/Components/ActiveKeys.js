import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import FullAccess from './ActiveKeysSub/FullAccess'
import FunctionCall from './ActiveKeysSub/FunctionCall'


const ActiveKeys = props => {
    return (
        <div>
            <Container>
                <Row className = "d-flex justify-content-center">
                    <FullAccess/>
                </Row>

                <Row className = "d-flex justify-content-center">
                    <FunctionCall/>

                </Row>
            </Container>
        </div>
    );
};

ActiveKeys.propTypes = {
    
};

export default ActiveKeys;