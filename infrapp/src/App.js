import React, { Component } from 'react';
import classnames from 'classnames';
import Info from './Info';
import Account from './Account';
import Contractor from './Contractor';
import Finger from './Finger';
import Figure from './Figure';
import Operation from './Operation';
import UpDownFile from './UpDownFile';
import emitter from './events';
import ImageData from './ImageData';
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
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    this.state.activeTab = emitter.on('activeTab', (data) => {
      this.setState({
        activeTab: data
      });
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              用户列表
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              图像
            </NavLink>
          </NavItem>   
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              上传/下载
            </NavLink>
          </NavItem>        
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              图像数据
            </NavLink>
          </NavItem>   
          <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Account account />
          </TabPane>
          <TabPane tabId="2">
            <Figure figure />
          </TabPane>
          <TabPane tabId="3">
            <UpDownFile updownfile />
          </TabPane>
          <TabPane tabId="4">
            <ImageData imageData />
          </TabPane>          
        </TabContent>          
        </Nav>        
          

      </div>

    );
  }
}
export default App;