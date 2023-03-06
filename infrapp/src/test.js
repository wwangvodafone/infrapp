import React from 'react';

import {
    CarouselItem,
    CarouselCaption,
    CarouselIndicators,
    CarouselControl,
    Carousel
  } from 'reactstrap';
  
const Test = ({ tobos }) => {

    function onExiting() {
        this.animating = true;
      }
    
    function onExited() {
        this.animating = false;
    }
    
    function next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex ===  tobos.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    function previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? tobos.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    function goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    let activeIndex = 0;
    return (
        
        <div>
        <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
        >
            <CarouselIndicators items={tobos} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {tobos.map((item, key) => {
                return (
                    <CarouselItem
                    className="my-Carousel"
                    tag="div"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    >
                    <a href="https://www.tsn.ca/soccer" target="_blank">
                        <img className="my-CarouselImage" 
                            src={item.location} alt={item.altText} />
                    </a>
                    </CarouselItem>
                );
            })}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    </div>
    )
}


/*
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        let {tobos} = this.propers;
        console.log("test" + tobos);
    }
  render() {
    return (
      <h1>{this.props.tobos}</h1>
    );
  }
}
*/
export default Test;