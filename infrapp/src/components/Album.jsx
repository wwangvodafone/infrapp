import React from 'react';
import FullScreenViewer from '../utils/FullScreen';
//import viewImage1 from '../utils/example';
//import statistic from  '../utils/example';
import * as image from '../utils/example';
import {
    Button,
    ButtonGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';


const Album = ({ album }) => {
    return (
        <div className="album py-5 bg-light">
            <Container>
                <Row>
                    {album.map((item, key) => {
                        return (
                            <Col md="4" key={key}>

                                <Card className="mb-4 box-shadow" style={{ cursor: "pointer" }}>
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.location}
                                        data-high-res-src={item.location}
                                        class="gallery-items"

                                    />
                                    <CardBody>
                                        <CardText>{item.description}</CardText>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <ButtonGroup>
                                                <Button
                                                    onClick={() => image.viewImage1(item.location)} 
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                >
                                                    浏览
                                                </Button>
                                                <Button
                                                    onClick={() => image.statistic(item.location)} 
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                >
                                                    分析
                                                </Button>
                                            </ButtonGroup>
                                            <small className="text-muted">
                                                
                                            </small>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <script src="../utils/example.js"></script>
        </div>
    );


};

export default Album;
