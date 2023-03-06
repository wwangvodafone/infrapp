import React from 'react';

import {
  CarouselItem,
  CarouselCaption,
  CarouselIndicators,
  CarouselControl,
  Carousel
} from 'reactstrap';

class Slides extends React.Component {
  constructor(props) {
      super(props);
      this.state = { activeIndex: 0 ,
        items: []
      };
      console.log(props);
      this.state.items = props.items;
      console.log(this.state.item);
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
  }

  onExiting() {
      this.animating = true;
  }

  onExited() {
      this.animating = false;
  }

  next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex ===  this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
  }

  previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
  }

  render() {
      const { activeIndex } = this.state;
      const marginLeft = (window.innerWidth / 2 - 150).toString() + 'px';
      console.log("in the render");
      console.log(this.state.items);
      const slides = this.state.items.map((item) => {
  
          return (
              <CarouselItem
                  className="my-Carousel"
                  tag="div"
                  key={item.id}
                  onExiting={this.onExiting}
                  onExited={this.onExited}
              >
                  <a href="https://www.tsn.ca/soccer" target="_blank">
                      <img className="my-CarouselImage" style={{ marginLeft: marginLeft }}
                          src={item.src} alt={item.altText} />
                  </a>

              </CarouselItem>
          );
      });

      return (
          <div>
              <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
              >
                  <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
          </div>
      );
  }
}

export default Slides;