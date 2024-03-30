import { Card, Col, DatePicker, Row, Tabs } from 'antd';
// import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
// import type moment from 'moment';
import { Column } from '@ant-design/charts';

import numeral from 'numeral';
// import type { DataItem } from '../data';
import styles from '../style.less';
import React from 'react';

// type RangePickerValue = RangePickerProps<moment.Moment>['value'];
// export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// const rankingListData: { title: string; total: number }[] = [];
// for (let i = 0; i < 7; i += 1) {
//   rankingListData.push({
//     title: `工专路 ${i} 号店`,
//     total: 323234,
//   });
// }

class SalesCard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }

  }
  render() {
    const { rangePickerValue,
      salesData1,
      salesData2,
      loading,
    rankingListData 
  } = this.props;
    // const salesData=[{x:1,y:12}]
    // const rankingListData=[{title: `一月`,
    //        total: 323234,}]
    return (

      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.salesCard}>
          <Tabs

            size="large"
            tabBarStyle={{ marginBottom: 24 }}
          >
            <TabPane tab="月做题数" key="sales">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      forceFit
                      data={salesData1}
                      xField="x"
                      yField="y"
                      xAxis={{
                        visible: true,
                        title: {
                          visible: false,
                        },
                      }}
                      yAxis={{
                        visible: true,
                        title: {
                          visible: false,
                        },
                      }}
                      title={{
                        visible: true,
                        text: '月做题趋势',
                        style: {
                          fontSize: 14,
                        },
                      }}
                      meta={{
                        y: {
                          alias: '月做题量',
                        },
                      }}
                    />
                  </div>
                </Col>
                {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>做题数量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.total).format('0,0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col> */}
              </Row>
            </TabPane>
            <TabPane tab="月正确率（%）" key="views">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Column
                      height={300}
                      forceFit
                      data={salesData2}
                      xField="x"
                      yField="y"
                      xAxis={{
                        visible: true,
                        title: {
                          visible: false,
                        },
                      }}
                      yAxis={{
                        visible: true,
                        title: {
                          visible: false,
                        },
                      }}
                      title={{
                        visible: true,
                        text: '月正确趋势',
                        style: {
                          fontSize: 14,
                        },
                      }}
                      meta={{
                        y: {
                          alias: '月正确率（%）',
                        },
                      }}
                    />
                  </div>
                </Col>
                {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>正确数量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span>{numeral(item.total).format('0,0')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col> */}
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    )
  }

}

// const SalesCard_ = ({
//   rangePickerValue,
//   salesData,
//   isActive,
//   handleRangePickerChange,
//   loading,
//   selectDate,
// }: {
//   rangePickerValue: RangePickerValue;
//   isActive: (key: TimeType) => string;
//   salesData: DataItem[];
//   loading: boolean;
//   handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
//   selectDate: (key: TimeType) => void;
// }) => (

// );

export default SalesCard;
