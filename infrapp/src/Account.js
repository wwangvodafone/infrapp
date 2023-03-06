import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/weiyun.jpg'
import line from './images/line.png'
import App from './App';
import ReactDOM from 'react-dom';
import emitter from './events';
import axios from 'axios';
import {
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem
 } from 'reactstrap';

 import { Divider } from 'rsuite';
global.answerList = new Array();
global.currIdx = 0;
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }


  componentDidMount() {
    fetch('http://133.18.23.48:3001/getpatients')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
      this.setState({ users: data })
    })
    .catch(console.log)
    
  }
 
  onClickQuestion = () => {
    const data = document.getElementById("text1").value;
    axios.post("http://133.18.23.48:3003/question", {
	question: data
    },{
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    })
    .then(function(response) {
        global.currIdx = global.currIdx + 1
  	global.answerList.push(response.data.result.content)
        document.getElementById('answer').textContent=response.data.result.content
    })

  }
  showPrevMessage = () => {
	console.log("prev");
	global.currIdx = global.currIdx - 1;
	console.log(global.currIdx);
	if (global.currIdx < 0) global.currIdx = 0;
        document.getElementById('answer').textContent=global.answerList[global.currIdx];
  }
  showNextMessage = () => {
	console.log("prev");
	global.currIdx = global.currIdx + 1;
	console.log(global.currIdx);
	if (global.currIdx >= global.answerList.length) global.currIdx = global.answerList.length - 1;
        document.getElementById('answer').textContent=global.answerList[global.currIdx];
  }
  handleGetValue(event) {
    console.log(event.target.innerText);
    emitter.emit('activeTab', '2');
    emitter.emit('userno', event.target.innerText);
  }
  render () {
      return (
        <div className="container">
          <img src={logo} alt="wechat" width="300" height="300"/>

          <Form onSubmit={this.CreateAccount}>         

            <p><strong><font size="5">用户列表</font></strong>.</p>
            <ListGroup>
              {this.state.users.map((item, key) => {
                return (
                  <ListGroupItem  color="success" tag="a" href="#" onClick={this.handleGetValue}>{item.userid}</ListGroupItem>
                  
                )
              })}

            </ListGroup>
            <p />
          </Form>
	  <Form>
	   <p><strong><font size="5">提问</font></strong>:</p>
	   <input type="text" id="text1" maxlength="50" />
           <button type="button" class="btn" onClick={this.onClickQuestion}>提问</button>
	  </Form>
	  <br/>
	  <Form>
 	    <p><strong><font size="5">回答</font></strong>:</p>
	    <textarea id="answer" name="message" color="success"  readonly ></textarea>
	  </Form>
	  <Form>
	    <div class="inner"><button type="button" class="left_click" onClick={this.showPrevMessage}></button></div>
	    <div class="inner"><button type="button" class="right_click" onClick={this.showNextMessage}></button></div>
	  </Form>
        </div>  
      );
  }
}

export default Account;
