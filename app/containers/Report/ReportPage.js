import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Select, Form, Input, InputNumber, Popconfirm, Layout, Menu } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../store/configureStore'
import { SummaryDashboard } from './SummaryDashboard'
import { StockReport } from './StockReport'
import { ActivityLog } from './ActivityLog'
const { Header, Sider, Content } = Layout;
import { Route } from 'react-router';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
import style from '../../assets/styles/stock.css'
import moment from 'moment'


class ReportPage extends Component<Props> {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
        dates : [moment(moment().subtract(30, 'days'),dateFormat),moment(moment(),dateFormat)]
    }
  }
  componentDidMount() {
      console.log(this.state.dates)
  }
  handleMenuSelect = (e) => {
    if (e.key === '1') {
      history.push('/report/summaryDashboard')
    }
    if (e.key === '2') {
      history.push('/report/stockReport')
    }
    if (e.key === '3') {
      history.push('/report/activity')
    }
    // buraya diger caseler gelecek
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
        dates:date,
    })
  }

render() {

  return (
    <div>
      <div className='page-header' >
        <div className='header-h'>Raporlar</div>
        <div style={{ display: 'flex' }}>
            <RangePicker
              placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
              format={dateFormat}
              onChange={this.onChange}
              defaultValue={this.state.dates}
            />


        </div>
      </div>
      <div className='page-body'>
        <Layout style={{marginLeft: "20px"}}>

          <Sider>
            <div className="logo" />
            <Menu
              style={{height: "70vh"}}
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              onClick={this.handleMenuSelect}
            >
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Summary Dashboard</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>Stock Report</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>Activity Log</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>

            <Content style={{ background: 'white', padding: '18px',overflow: 'auto', height:'70vh' }}>
              
          <Route path='/report/summaryDashboard' render={(props) => (
            <SummaryDashboard {...props} dates={this.state.dates} />
          )}/>
          <Route path='/report/stockReport' render={(props) => (
            <StockReport {...props} />
          )}/>
          <Route path='/report/activity' render={(props) => (
             <ActivityLog {...props} dates={this.state.dates}/>
           )}/>
              </Content>
          </Layout>
        </Layout>


      </div>

    </div>

  );
}
}
function mapStateToProps({ }) {

  return {

  }
}

const ConnectedPage = connect(mapStateToProps, {})(ReportPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ReportPage }