import React, { Component } from 'react';
import Web3 from 'web3';
//import ipfsAPI from 'ipfs-http-client';
import logo from './images/newbeem.png'
import {
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
 } from 'reactstrap';

class Finger extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        added_file_hash: '',
        contractAbiVal: '',
        contractAddress: '',
        fileHash: '',
        saveResult:'',
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      //this.ipfsApi = ipfsAPI('localhost', '5001')
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
      console.debug(this.web3.isConnected())
    }
  
    UpdateContractAbiValue = (e) => {
      e.preventDefault();
      this.setState({ contractAbiVal: e.target.value })
    }
  
    UpdateContractAddr = (e) => {
      e.preventDefault();
      this.setState({ contractAddress: e.target.value })
    }

    UpdateFileHash = (e) => {
      e.preventDefault();
      this.setState({ fileHash: e.target.value })
    }

    SaveToEther= (e) => {
      e.preventDefault();
      console.debug("abi:" + this.state.contractAbiVal);
      console.debug("address:" + this.state.contractAddress);
      var abiJson = JSON.parse(this.state.contractAbiVal);
      var contract = this.web3.eth.contract(abiJson).at(this.state.contractAddress);
      //contract.sendHash(this.state.fileHash);
    }

    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      let reader = new FileReader();
      let file = this.state.file;
      /*
      reader.onloadend = () => {
        //const ipfs = ipfsAPI('localhost', 5001) // Connect to IPFS
        const buf = Buffer.from(reader.result) // Convert data into buffer
        //this.ipfsApi.add(buf, (err, result) => { // Upload buffer to IPFS
        //  if(err) {
        //    console.error(err)
        //    return
        //  }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)

          this.setState({ added_file_hash:url });
          console.debug("url=", this.state.added_file_hash);
        });
      }
      */
      reader.readAsDataURL(file)
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    saveToIpfs = (reader) => {
      let ipfsId
      const buffer = Buffer.from(reader.result)
      /*
      this.ipfsApi.add(buffer)
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        this.setState({added_file_hash: ipfsId})
        //this.setState({fileHash, ipfsId})
      }).catch((err) => {
        console.error(err)
      })
      */
    }

    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div className="container">
          <img src={logo} alt="newbeem" width="200" height="80"/>        
          <Form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} />
            <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
          </Form>
          {$imagePreview}
          <Form>
          <FormGroup>
              <table>
                <tbody>
                  <tr>
                    <td class="color">{this.state.added_file_hash}</td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
          </Form>
          <Form onSubmit={this.SaveToEther}>
            <FormGroup>
              <div class="row">
                <div class="col-25">
                  <Label for="contractAbi">Contract ABI:</Label>
                </div>
                <div class="col-75">
                  <Input type="text" name="contractAbi" id="contractAbiName" placeholder="Contract abi for save ipfs hash" ref={node => {this.inputValue = node}} onChange={this.UpdateContractAbiValue}/>
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <Label for="contractAddress">Contract Address:</Label>
                </div>
                <div class="col-75">
                  <Input type="text" name="contractAddress" id="contractAddrName" placeholder="Contract address for save ipfs hash" ref={node => {this.inputValue = node}} onChange={this.UpdateContractAddr}/>
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <Label for="ipfsHash">File Hash:</Label>
                </div>
                <div class="col-75">
                  <Input type="text" name="ipfsHash" id="ipfshashName" placeholder="Hash of the Ipfs file" ref={node => {this.inputValue = node}} onChange={this.UpdateFileHash}/>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <div class="row">
                <input type="submit" value="Save Hash"/>
              </div>
              <div class="row">
                <table>
                  <tbody>
                    <tr>
                      <td>Save Result:</td>
                      <td>{this.state.saveResult}</td>
                    </tr>
                  </tbody>
                </table> 
            </div>
            </FormGroup>          
          </Form>
        </div>
      )
    }
  
  }

  
 export default Finger;