import React from 'react';
import Album from './Album';
import { Button, Container, Jumbotron } from 'reactstrap';

const Main = ({ album }) => {
    return (
        <main role="main">
            <Jumbotron className="text-center">
                <Container>
                    <h1 className="jumbotron-heading">红外图像</h1>
                    <p className="lead text-muted">

                    </p>
                    <p>

                    </p>
                </Container>
            </Jumbotron>
            <Album album={album} />
           
        </main>
    );
};

export default Main;
