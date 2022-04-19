import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import Metadata from './Components/Metadata'
import SendTokens from './Components/SendTokens'
import ActiveKeys from './Components/ActiveKeys'

import './scss/AppStyles.scss'
import {Container, Navbar, NavDropdown, Nav, Row, Col, Card, Button} from 'react-bootstrap'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  return (
    <React.Fragment>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand >Block-View</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        
       
      </Nav>
      <Nav>
        
        <Nav.Link onClick={(window.accountId==='')?login:logout}>
          {(window.accountId==='')?'Login':window.accountId}
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  {(window.accountId!=='')?

    <Container>
      <Row className="d-flex justify-content-center"> <Metadata/> </Row>
      <Row className="d-flex justify-content-center">
        <SendTokens />
      </Row>
      <Row className="d-flex justify-content-center"><ActiveKeys /></Row>

    </Container>
    :<Card>
      <Card.Header as='h5'>Hello User</Card.Header>
      <Card.Body>
        <Card.Title>Please Login</Card.Title>
        <Card.Text>
          This App only works with NEAR Protocol!
        </Card.Text>
        <Button onClick={login}>Login</Button>
      </Card.Body>
    </Card>
    

  }
  </React.Fragment>
  )
}