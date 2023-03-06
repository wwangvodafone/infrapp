import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/newbeem.png'
import {
  Alert,
  Row,
  Col,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
 } from 'reactstrap';

 class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mining: false,
          node: '',
          hashrate: '',
          peerCount: '',
          isConnected: false,
          accountRslt: '',
          balanceRslt: 0,
          minerStart: '',
          minerStop: '',
          blockNum: 0,
          dropdownOpen: false,
          dropDownValue:'Ethereum NetWork Select',
        };
        this.toggle = this.toggle.bind(this);
        const nodeAdd = 'http://192.157.241.6:8501'
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
        console.debug(this.web3.isConnected())
        this.blockNumber = 0;
        this.getBlockNumber = this.getBlockNumber.bind(this);
        this.onEthereumLink1 = this.onEthereumLink1.bind(this);
        this.onEthereumLink2 = this.onEthereumLink2.bind(this);
      }
  
      componentWillMount() {
        //this.getEthereumValues();
      }

      componentDidMount() {
        this.interval = setInterval(() => this.getEthereumValues({}), 10000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
      
      getBlockNumber(num) {
        this.blockNumber = num;
        console.debug("blockNumber: " + this.blockNumber);
      }
      getEthereumValues() {
        if(this.web3 && this.web3.isConnected()) {
          this.setState({isConnected: true});
          this.setState({node: this.currentProvider()})
          this.setState({mining: this.isMining()})
          this.setState({hashrate: this.currentHashrate()});
          this.setState({peerCount: this.currentPeerCount()});
          this.currentBlockNum(this.getBlockNumber);
          this.setState({blockNum: this.blockNumber});;
          //console.debug(this.state.node)
        }
      }
    //接続先ノードの取得
    currentProvider() {
        return this.web3.currentProvider.host;
      }
    
      //接続先ノードのマイニング状態の取得
      //マイニング中であればtrue、そうでなければfalse
      isMining() {
        console.debug("ismining:" + this.web3.eth.mining)
        return this.web3.eth.mining;
      }
    
      //接続先ノードのマイニングのハッシュレートを取得
      currentHashrate() {
        console.debug("hashrate:" + this.web3.eth.hashrate)
        return this.web3.eth.hashrate;
      }
    
      //接続先ノードのピア数の取得
      currentPeerCount() {
        return this.web3.net.peerCount;
      }

      currentBlockNum(callback) {
        this.web3.eth.getBlockNumber(function (error, result) {
          if(!error) {
            console.debug("blockNum:" + result);
            callback(result);
            return result;
          }
        });
      }

      onEthereumLink1() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
      }
      onEthereumLink2() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://192.157.241.6:8501'));
      }

      toggle(e) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
        this.setState({
          dropDownValue: e.currentTarget.textContent
        });
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.state.dropDownValue));
        this.getEthereumValues();
      }

    render () {
        return (
            <div class="container"> 
                <Form>
                  <img src={logo} alt="newbeem" width="200" height="80"/>
                  <table>
                  <thead>
                      <tr>
                      <th>Item</th>
                      <th>Value</th>
                      </tr>
                  </thead>
                  <tbody>     
                      <tr className="success">
                      <td>Node</td>
                      <td>{this.state.node}</td>
                      </tr>
                      <tr className="danger">
                      <td>Is Mining?</td>
                      <td>{this.state.mining?'Ture':'False'}</td>
                      </tr>
                      <tr className="info">
                      <td>HashRate</td>
                      <td>{this.state.hashrate}</td>
                      </tr>
                      <tr className="warning">
                      <td>Peer Count</td>
                      <td>{this.state.peerCount}</td>
                      </tr>
                      <tr>
                      <td>BlockNum</td>
                      <td>{this.state.blockNum}</td>
                      </tr>
                  </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                          <tr>
                          <th>Ethereum Address</th>
                          </tr>
                      </thead>
                    <tbody>
                        <tr>
                            <td><input type="radio" name="ethLink" 
                                      value="ethLink1"
                                      checked="checked"
                                      onChange={this.onEthereumLink1} />http://133.18.23.48:8545</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="ethLink" 
                                      value="ethLink2"
                                      onChange={this.onEthereumLink2} />http://192.157.241.6:8501</td>
                        </tr>
                    </tbody>
                  </table>   


                </Form>
            </div>
        );
    }
 }

 export default Info;