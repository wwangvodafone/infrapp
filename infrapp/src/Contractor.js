import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/newbeem.png'
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
 } from 'reactstrap';
import { SelectPicker } from 'rsuite';
//import { fromNodeAddress } from 'multiaddr';

 class Contractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractBin:'',
      contractAbi: '',
      deployAddress: '',
      accountDeploy: '',
      accountDeployPasswd: '',
      accountDeployBalance: 0
    };
    this.sendTransac = this.sendTransac.bind(this);
    this.getResults = this.getResults.bind(this);
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
    console.debug(this.web3.isConnected())
  }

  UpdateContractBinary = (e) => {
    e.preventDefault();
    this.setState({ contractBin: e.target.value })
  }

  UpdateAccountValue = (e) => {
    e.preventDefault();
    this.setState({ accountDeploy: e.target.value })
  }

  UpdateAccountPassword = (e) => {
    e.preventDefault();
    this.setState({ accountDeployPasswd: e.target.value })
  }

  DeployContract = (e) => {
    e.preventDefault();
    console.debug(this.state.contractBin);
    console.debug(this.state.accountDeploy);
    console.debug(this.state.accountDeployPasswd)
    this.web3.personal.unlockAccount(this.state.accountDeploy, this.state.accountDeployPasswd);
    this.sendTransac (this.getResults);
/*
    var binary = "0x" + this.state.contractBin;
    this.web3.eth.sendTransaction({ from: this.state.accountDeploy, data: binary, gas: 500e3 }, (error, tx) => {
      if (error) {
        console.debug(error);
        this.setState({ deployAddress: "Cannot deploy..." });
      }
      else {
        const sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        sleep(20000).then(() => {
          var hash = tx;
          console.debug(hash);
          var address = this.web3.eth.getTransactionReceipt(hash);
          console.debug(address);
          if (address != null) {
            address = address.contractAddress;
            this.setState({ deployAddress: address });
          }
          else {
            this.setState({ deployAddress: "mining..."});
          }          
        })

        
      }
    });
    */
  }

  sendTransac(callback) {
    var binary = "0x" + this.state.contractBin;
    this.web3.eth.sendTransaction({ from: this.state.accountDeploy, data: binary, gas: 500e3 }, (error, tx) => {
      if (error) {
        console.debug("error:"+ error);
        callback(error); 
      }
      else {
        var address = this.web3.eth.getTransactionReceipt(tx);
        if (address != null) {
          address = address.contractAddress;
          callback(address);
        }
        else {
          callback("mining...");
        } 
      }
      
    });
  }


  getResults(address) {
    console.debug("contract address=" + address);
    this.setState({ deployAddress: address });
  }

  render () {
    return (
      <div class="container">
        <Form onSubmit={this.DeployContract}>
          <img src={logo} alt="newbeem" width="200" height="80"/>
          <FormGroup>
            <div className="row">
              <div className="col-25">
                <Label for="Contract Binary">Contract Binary:</Label>
              </div>
              <div className="col-75">
                <Input type="text" name="binary" id="binary" placeholder="Contract Binary" ref={node => {this.inputValue = node}} onChange={this.UpdateContractBinary}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <Label for="accountEthersName">Account Deploy Contract:</Label>
              </div>
              <div className="col-75">
                <Input type="text" name="accountethers" id="accountEthersName" placeholder="Account For Deploy Contract" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountValue}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <Label for="accountpasswdName">Account Password:</Label>
              </div>
              <div className="col-75">
                <Input type="text" name="accountpasswd" id="accountPasswdName" placeholder="Password For Account" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountPassword}/> 
              </div>
            </div>
          </FormGroup>
          <div className="row">
            <input type="submit" value="Deploy Contract"/>
          </div>
          <table>
                <tbody>
                  <tr>
                    <td>Result:</td>
                    <td>{this.state.deployAddress}</td>
                  </tr>
                </tbody>
              </table> 
        </Form>
      </div>
    )
  }
 }

 export default Contractor;
