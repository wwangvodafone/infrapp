import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Slides from './Slide';
//import albumItems from './data/album';
//import socialLinks from './data/socialLinks';
import logo from './images/weiyun.jpg'
import './css/App.css';
import emitter from './events';

class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            //socialLinks: socialLinks,
  //          album: albumItems,
            images: [],
            userno: 0
        };


        console.log("In the Figure.");
    }

    componentDidMount() {
        let userid = 0;
        this.state.userno = emitter.on('userno', (data) => {
            userid = data;
            console.log('userid=' + userid);
            console.log("getpatientimages");
            fetch('http://133.18.23.48:3001/getpatientimages?userid=' + userid)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            this.setState({ images: data })
            })
            .catch(console.log)
        });
        if (userid === 0) {
            console.log("getimages"+userid);
            fetch('http://133.18.23.48:3001/dbaccess')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            this.setState({ images: data })
            })
            .catch(console.log)
        }

        }
     


    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        return (
            <div>
                <img src={logo} alt="weiyun" width="300" height="300"/>        
                <Main album={this.state.images} />

            </div>
            
        );
    }
}

export default Figure;
