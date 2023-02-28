import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

function ModifyProductPage() {


    return (



        <div>
            <div className='box'>
                <div className='card-body' >
                    <br/>
                    <h2>Modificar Articulo</h2>
                    <div>
                        <form>

                            <div className='mb-3'>

                                <Container>
                                    <Row>
                                        <Col>
                                            <label className='form-label'>Nombre</label>
                                            <InputGroup>
                                                <Form.Control aria-label="El nombre del producto" />
                                                <InputGroup.Text></InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <label className='form-label'>Departamento</label>
                                            <Form.Select aria-label="Default select example">
                                                <option>Departamento</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <label className='form-label'>Tipo</label>
                                            <Form.Select aria-label="Default select example">
                                                <option>Tipo de producto...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>

                                        </Col>
                                        <Col>
                                            <label className='form-label'>Costo</label>
                                            <InputGroup>
                                                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                                                <InputGroup.Text>$</InputGroup.Text>

                                            </InputGroup>

                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col> <Form.Check aria-label="option 1" />Nuevo</Col>
                                        <Col><Form.Check aria-label="option 1" />Usado</Col>
                                        <Col></Col>
                                        <Col></Col>
                                        <Col></Col>
                                    </Row>
                                </Container>

                            </div>


                            <div className='mb-3'>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </div>

<Button> Guardar 
</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ModifyProductPage;