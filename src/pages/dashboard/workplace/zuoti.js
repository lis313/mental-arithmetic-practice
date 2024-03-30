import { Button, Form, Input, Select, Card, Col, Row, Divider, List, message, InputNumber } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { History } from 'umi';
import { history } from 'umi';
import Icon, { CheckOutlined, CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const layout2 = {
    labelCol: {
        span: 16,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout2 = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const wrongColor = 'red'
const rightColor = 'green'
// @connect(({ dmodel }) => ({
//     dmodel,
//   }))
class Zuoti extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            problemList: [

            ],
            idList: [],
            dcList: [],

        }

    }
    createDc = (index, id) => {
        const { dcList } = this.state;

         console.log(dcList, id);
        if (dcList.length != 0) {
            console.log(dcList);
            return dcList.map((item) => {
                if (item.id == id) {
                    console.log('item',item);
                    let res = item.right; // 使用可选链式操作符
                    console.log(res);
                    if (res) {
                        console.log('111');
                        return <div style={{ color: 'green', position: 'relative', left: '360px', top: '-20px' }}><CheckOutlined />回答正确</div>
                    }
                    else {

                        console.log('11211')
                        let ress = item.result;
                        return <div style={{ color: 'red', position: 'relative', left: '360px', top: '-20px' }}><CloseOutlined />正确答案是：{ress}</div>
                    }
                }

            })


        }
    }
    createList = () => {
        const { problemList } = this.state;
        return (
            problemList.map((item, index) => {
                return <Col span={12}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name={item.id}
                                label={item.question}
                                colon={false}
                                style={{
                                    color: 'black'
                                }}

                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <span>
                            {
                                this.createDc(index, item.id)
                            }
                            </span>

                            
                        </Col>

                    </Row>




                </Col>
            })




        )



    }
    retur = () => {
        history.push('/dashboard/workplace');


    }
    createRow = () => {
        const { problemList, dcList } = this.state;
        if (problemList.length == 0) {
            return null;

        }
        else {
            if (dcList.length == 0) {
                return (
                    <Row>
                        {this.createList()}
                        <Col span={24} offset={8}>

                            <Form.Item {...tailLayout2}>
                                <Button
                                    type="primary"
                                    htmlType="submit" >
                                    提交
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                )

            }
            else {
                return (
                    <Row>
                        {this.createList()}
                        <Col span={24} offset={12}>
                            <Button
                                type="primary"
                                onClick={this.retur}
                            >
                                完成
                            </Button>

                        </Col>
                    </Row>
                )

            }

        }
    }
    formRef = React.createRef();
    formRef2 = React.createRef();
    onFinish = (values) => {
        console.log(this.props);
        this.setState({
            problemList: [

            ],
            idList: [],
            dcList: [],

        })
        const { grade } = this.props.history.location.query;
        const { bracket = 0, count } = values;
        let data = {
            bracket: parseInt(bracket),
            count: parseInt(count),
            grade: parseInt(grade),
        };
        console.log('111', JSON.stringify(data));
        fetch('http://cal.romi.fun/api/cal/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data.questions);
                const questionsMap = data.data.questions;
                const qlist = [];
                const ilist = [];
                message.info(data.msg);
                this.setState({
                    problemList: [...questionsMap],
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                // Handle the error as needed
            });


        console.log(values);



    };
    onReset = () => {
        this.formRef.current.resetFields();
    };
    submitAnswers = async (answers) => {
        const { dcList } = this.state;
        try {
            const response = await fetch('http://cal.romi.fun/api/cal/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ ...answers }),
            });
            const data = await response.json();
            dcList.push(data.data);
            console.log(data.data);
            this.setState({
                dcList: [...dcList],
            });
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };
    onFinish2 = (values) => {
        console.log('112', values);
        let answer = {
        }
        for (let key in values) {

            answer.id = parseInt(key);
            answer.result = parseInt(values[key]);
            this.submitAnswers(answer);
            answer = {}
        }


    }

    render() {
        const { grade } = this.props.history.location.query;
        const disabled = parseInt(grade) > 4 ? false : true
        return (
            <>
                <Card>
                    <Row>
                        <Col span={12}></Col>
                    </Row>
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="bracket"
                                    label="包含括号算式数量"

                                >

                                    <Input
                                        disabled={disabled}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="count"
                                    label="生成算式数量"
                                    rules={[
                                        {
                                            required: true,

                                        }

                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} offset={8}>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" >
                                        生成
                                    </Button>
                                    <Button htmlType="button" onClick={this.onReset}>
                                        重置
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Divider orientation="center">题单</Divider>

                <Card style={{ height: '450px' }}>
                    <Form {...layout2} ref={this.formRef2} name="control" onFinish={this.onFinish2}>
                        {this.createRow()}
                    </Form>



                </Card>
            </>



        );
    }
}


export default Zuoti;