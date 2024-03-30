// import type { FC } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Button, Divider } from 'antd';
import { Radar } from '@ant-design/charts';
import React from 'react';
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
// import type { ActivitiesType, CurrentUser } from './data';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
class Workplace extends React.PureComponent{
  constructor(props){
    super(props);

    this.state={
      projectNotice:[],
      projectLoading:false,
      activitiesLoading:false,
      activities:['1+1=3','2+1=1','3-2=2'],
      data:['1+1=3','2+1=1','3-2=2'],
      dcfx:[],
      ct:[],
      showA:'none'

    }
  }
  componentDidMount(){
    fetch('http://cal.romi.fun/api/cal/analyst',{
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
      }
    })
      .then(response => response.json())
      .then(data => {console.log(data);this.setState({dcfx:data.data})})
      .catch(error => console.error('Error:', error));


      fetch('http://cal.romi.fun/api/cal/wrong',{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      .then(response => response.json())
      .then(data => {console.log(data);this.setState({ct:[...data.data.questions]})})
      .catch(error => console.error('Error:', error));
  }
  
  renderActivities=(item)=>{
    return(
      <div>
        <Row>
          <Col span={24}>
          <span style={{fontSize: '16px'}} >{item.question}</span>=<span style={{fontSize: '16px',color:'red'}}>{item.result}</span>
          <span style={{display:`${this.state.showA}`,fontSize: '16px',color:'blue',float: 'right'}}>{item.right_result}</span>
          </Col>
          <Divider/>
          
        </Row>
    
    
    
   
       </div>
    
    )

  }

  
  render(){
    const {add_right,add_wrong,div_right,div_wrong,mix_right,mix_wrong,mul_right,mul_wrong,sub_right,sub_wrong}=this.state.dcfx;
    console.log('ct',this.state.ct)
    const radarOriginData = [
      {
        name: '正确',
        add: add_right,
        sub:sub_right,
        div:div_right,
        mix:mix_right,
        mul:mul_right,
      },
      {
        name: '错误',
        add: add_wrong ,
        sub:sub_wrong,
        div:div_wrong,
        mix:mix_wrong,
        mul:mul_wrong,
      },
      
    ];
    console.log(radarOriginData);
    
   const radarData= [];
   const radarTitleMap = {
      add: '加法',
      sub: '减法',
      mul: '乘法',
      div: '除法',
      mix: '混合',
    };
  
    radarOriginData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'name') {
          radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });
    console.log(radarData);

    const {projectLoading,activitiesLoading,activities,data}=this.state;
    const links = [
      {
        title: '成绩分析',
        href: '/dashboard/analysis',
      },
      
    ];
    const projectNotice=[
      {
        id:1,
        title:'一年级',
        href:'/dashboard/workplace/zuoti?grade=1',
        description:'两个操作数的简单加减法'

      },
      {
        id:2,
        title:'二年级',
        href:'/dashboard/workplace/zuoti?grade=2',
        description:'两个操作数的简单加减法'

      },
      {
        id:3,
        title:'三年级',
        href:'/dashboard/workplace/zuoti?grade=3',
        description:'多个操作数的加减乘除法'

      },
      {
        id:4,
        title:'四年级',
        href:'/dashboard/workplace/zuoti?grade=4',
        description:'多个操作数的加减乘除法'

      },
      {
        id:5,
        title:'五年级',
        href:'/dashboard/workplace/zuoti?grade=5',
        description:'带括号的随机算式'

      },
      {
        id:6,
        title:'六年级',
        href:'/dashboard/workplace/zuoti?grade=6',
        description:'带括号的随机算式'

      },
    ]
    return(
      
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="练习题卡"
            bordered={false}
            loading={projectLoading}
            bodyStyle={{ padding: 0 }}
          >
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Link to={item.href}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  
                </Card>
              </Card.Grid>
            ))}
          </Card>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={true}
            className={styles.activeCard}
            title="错题回顾"
            // bordered
            loading={activitiesLoading}
          >
            <List
              loading={activitiesLoading}
              renderItem={(item) => this.renderActivities(item)}
              dataSource={this.state.ct}
              className={styles.activitiesList}
              footer={<div><Button type='primary' onClick={()=>{this.setState({showA:'inline'})}}>查看答案</Button><Button style={{marginLeft:'10px'}} type='primary' onClick={()=>{this.setState({showA:'none'})}}>隐藏答案</Button></div>}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="对错分析"
            loading={false}
          >
            <div className={styles.chart}>
              <Radar
                height={343}
                data={radarData}
                angleField="label"
                seriesField="name"
                radiusField="value"
                area={{
                  visible: false,
                }}
                point={{
                  visible: true,
                }}
                legend={{
                  position: 'bottom-center',
                }}
              />
            </div>
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="错题"
            loading={false}
          >
           <Button>错题重做</Button>
          </Card>
         
        </Col>
      </Row>
    )
  }
} 


export default Workplace;
