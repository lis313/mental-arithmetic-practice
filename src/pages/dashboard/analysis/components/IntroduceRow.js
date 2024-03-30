import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
// import { Col, Row, Tooltip } from 'antd';
import { Button, Card, Table, Icon, Form, Tooltip, Divider, Modal, Drawer, Spin,Row,Col,Statistic} from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
// import type { DataItem } from '../data';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import React from 'react';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 3312 + 1000 * 30; 

class IntroduceRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visitData: [],  
    };
  }
  
  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    const {loading,visitData}=this.state;
    const {sumNumber,dayNumber,sumRate,dayRate}=this.props;
    const num=parseFloat(sumRate).toFixed(1);
    const nums=Number(num);
    return (
      <>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总做题数"
              action={
                <Tooltip title="总做题数">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={
                () => <>{`${parseInt(sumNumber)}`}</>
              }
              footer={<Field label="日做题数" value={`${parseInt(dayNumber)}`} />}
              contentHeight={46}
            >
              <TinyArea
                color="#975FE4"
                xField="x"
                height={46}
                forceFit
                yField="y"
                smooth
                data={visitData}
              />
              
            </ChartCard>
          </Col>         
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="总正确率"
              action={
                <Tooltip title="做题正确率">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total={`${(parseFloat(sumRate).toFixed(4))*100}%`}
              footer={<Field label="日正确率" value={`${(parseFloat(dayRate).toFixed(4))*100}%`} />}
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={nums}
                color="#13C2C2"
                forceFit
                size={8}
                marker={[
                  {
                    value: 0.8,
                    style: {
                      stroke: '#13C2C2',
                    },
                  },
                ]}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
          <Card
              bordered={false}
              loading={loading}
              // title="高考倒计时"
              style={{height:'180px'}}
              
            >
             
              <Countdown title="高考倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
              
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              bordered={false}
              loading={loading}
              title="一言"
              style={{height:'180px'}}
            >
              <p>一万年太久,只争朝夕。--毛泽东</p>
              
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}



export default IntroduceRow;
