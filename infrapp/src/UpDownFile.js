import React, { Component } from 'react';
import logo from './images/weiyun.jpg';
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
 } from 'reactstrap';


 class UpDownFile extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }

      onChangeUpdate=event=>{
        this.setState({
         selectedFile: event.target.files,
        })
    }

    onClickUpdate = () => {
        const data = new FormData()
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
     
       axios.post("http://133.18.23.48:3003/upload", data, { 
           // receive two    parameter endpoint url ,form data
       })
     
     .then(res => { // then print response status
         console.log(res.statusText)
      })
     
     }
    render () {
        return (
          <div class="container">
            <Form >
              <img src={logo} alt="webyun" width="300" height="300"/>
              <FormGroup>
                <div className="row">
                  <div className="col-25">
                    <Label for="Contract Binary">上传文件:</Label>
                  </div>
                  <div className="col-75">
                    <Input type="file" class="form-control" multiple onChange={this.onChangeUpdate}/>                   
                  </div>
                  <div className="row">
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickUpdate}>上传</button> 
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <Label for="accountEthersName">下载文件:</Label>
                  </div>
                  <div className="row">
                  <button type="button">红外图像</button>      
                  <a href='http://133.18.23.48:3004/download' class="btn btn-success btn-block" >下载</a>      
                  </div>
                </div>
 
              </FormGroup>

            </Form>
          </div>
        )
      }
 }
 export default UpDownFile;