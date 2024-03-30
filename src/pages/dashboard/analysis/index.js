// import type { FC } from 'react';
import React from 'react';
import { Suspense, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
// import type { RadioChangeEvent } from 'antd/es/radio';
// import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
// import  moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import { useRequest } from 'umi';

// import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
// import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
// import type { AnalysisData } from './data.d';
import styles from './style.less';



class Analysis extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            data:[],
            rankingListData:[],
            salesData1:[
              {x:'1月',y:0},
              {x:'2月',y:0},
              {x:'3月',y:0},
              {x:'4月',y:0},
              {x:'5月',y:0},
              {x:'6月',y:0},
              {x:'7月',y:0},
              {x:'8月',y:0},
              {x:'9月',y:0},
              {x:'10月',y:0},
              {x:'11月',y:0},
              {x:'12月',y:0},
            ],
            salesData2:[
              {x:'1月',y:0},
              {x:'2月',y:0},
              {x:'3月',y:0},
              {x:'4月',y:0},
              {x:'5月',y:0},
              {x:'6月',y:0},
              {x:'7月',y:0},
              {x:'8月',y:0},
              {x:'9月',y:0},
              {x:'10月',y:0},
              {x:'11月',y:0},
              {x:'12月',y:0},
            ],
            visitData:[],
            info:{
              sumNumber:0,
              dayNumber:0,
              sumRate:0, 
              dayRate:0,
              mouthNumber:[],
              rightNumber:[],
            }
        }
    }
    componentDidMount() {
      const {salesData1,salesData2}=this.state;
        console.log("componentDidMount");
        fetch('http://cal.romi.fun/api/cal/info')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let das={
                  sumNumber:data.data.question_number,
                  dayNumber:data.data.day_question,
                  sumRate:data.data.right_rate,
                  dayRate:data.data.day_right_rate,
                }
                data.data.month_question.map((item,index)=>{
                  salesData1[index].y=item

                })
                data.data.month_right_rate.map((item,index)=>{
                  salesData2[index].y=(parseFloat(item)*100).toFixed(2)

                })
                this.setState({
                     info:{...das},
                     salesData1:{...salesData1},
                     salesData2:{...salesData2},
                })
            });
    }
  render(){
    const {loading,data,rankingListData,salesData1,salesData2,visitData}=this.state;
    const {sumNumber,dayNumber,sumRate, dayRate}=this.state.info;

      return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow sumNumber={sumNumber} dayNumber={dayNumber} sumRate={sumRate} dayRate={dayRate}/>
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard
            salesData1={salesData1}
            salesData2={salesData2}
            rankingListData={rankingListData}
            loading={loading}
          />
        </Suspense>
      </>
    </GridContent>
  );
  }
}
export default Analysis;
