import React, { useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import PokeDetails from 'components/PokeDetails/PokeDetails';
import PokeList from 'components/PokeList/PokeList';

function App() {
    const [selected, setSelected] = useState<string>('');

    return (
        <Container className="pt-md-5">
            <h1 className="display-5">React-app w/ TS Poke App Example</h1>
            <Row>
                <Col>
                    <PokeList limit={5} onPokeSelected={setSelected} />
                </Col>
                <Col>
                    <PokeDetails name={selected} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
