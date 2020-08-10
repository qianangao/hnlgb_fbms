import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Modal, Radio, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'umi';
import { checkIdCard, checkPhone } from '@/utils/validators';
// import styles from './style.less';

const PersonInfoForm = ({
  dispatch,
  returnworkPetitionDetails,
  actionRef,
  addLoading,
  editLoading,
  form,
}) => {
  const { personModalVisable } = returnworkPetitionDetails;
  const INIT_FORM_DATA = {
    name: '', // 姓名y
    idCard: '', // 身份证号
    contactInformation: '', // 联系方式
    returnTime: undefined, // 复工日期 date
    householdRegister: '', // 户籍地址
    residenceAttribute: undefined, // 居住地属性 enum
    detailedAddress: '', // 详细地址
    returnDateEnum: 0, // 返回顺德日期 enum
    returnDate: '', // 返回顺德日期数据
    epidemicAreaEnum: 0, // 是否抵达疫区 enum
    epidemicArea: '', // 是否抵达疫区数据
    vehicle: undefined, // 交通工具 enum
    trainNumber: '', // 车次或航班号及座位号
    departureDate: undefined, // 离开日期 date
    stayDays: undefined, // 停留天数 number
    daysToShunde: undefined, // 离开疫区到达顺德天数 number
    homeSegregation: '', // 居家隔离
    centralizeSegregation: '', // 集中隔离
  };

  const [type, setType] = useState('add');
  const [companyId, setCompanyId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [formData, setFormData] = useState(INIT_FORM_DATA);

  const showModal = (typePre, _enterpriseId, object) => {
    setCompanyId(_enterpriseId);
    setType(typePre);

    if (typePre === 'add') {
      setEmployeeId('');
      setFormData(INIT_FORM_DATA);
    } else if (typePre === 'edit') {
      setEmployeeId(object.id);
      setFormData(object);
    }

    dispatch({
      type: 'returnworkPetitionDetails/changePersonModalVisable',
      payload: {
        visible: true,
      },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'returnworkPetitionDetails/changePersonModalVisable',
      payload: {
        visible: false,
      },
    });
  };

  const handleOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `returnworkPetitionDetails/${
            type === 'add' ? 'addReturnworkPerson' : 'editReturnworkPerson'
          }`,
          payload: {
            ...values,
            id: employeeId,
            enterpriseId: companyId,
          },
        });
      }
    });
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Modal
      title={type === 'add' ? '新增复工人员' : '编辑复工人员信息'}
      width={640}
      visible={personModalVisable}
      onOk={handleOk}
      confirmLoading={addLoading || editLoading}
      onCancel={hideModal}
      destroyOnClose
    >
      <Form {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: formData.name || '',
            rules: [
              { required: true, message: '请输入员工姓名!', whitespace: true },
              { max: 50, message: '姓名长度请小于50位!', whitespace: true },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="身份证">
          {getFieldDecorator('idCard', {
            initialValue: formData.idCard || '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入员工身份证号!', whitespace: true },
              { validator: checkIdCard },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="联系方式">
          {getFieldDecorator('contactInformation', {
            initialValue: formData.contactInformation || '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入联系方式!', whitespace: true },
              { validator: checkPhone },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="复工时间">
          {getFieldDecorator('returnTime', {
            initialValue: formData.returnTime ? moment(formData.returnTime) : null,
            rules: [{ type: 'object', required: true, message: '请选择复工时间!' }],
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="户籍地址">
          {getFieldDecorator('householdRegister', {
            initialValue: formData.householdRegister || '',
            rules: [{ required: true, message: '请输入户籍地址!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="居住地属性">
          {getFieldDecorator('residenceAttribute', {
            initialValue: formData.residenceAttribute,
            rules: [
              {
                required: true,
                message: '请选择居住地属性!',
              },
            ],
          })(
            <Select placeholder="请选择居住地属性">
              <Select.Option value={1}>自由住宅</Select.Option>
              <Select.Option value={2}>出租屋</Select.Option>
              <Select.Option value={3}>企业宿舍</Select.Option>
              <Select.Option value={4}>工地</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="详细地址">
          {getFieldDecorator('detailedAddress', {
            initialValue: formData.detailedAddress || '',
            rules: [{ required: true, message: '请输入详细地址!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="返回顺德日期">
          {getFieldDecorator('returnDateEnum', {
            initialValue: formData.returnDateEnum || 0,
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  try {
                    if (value === undefined) {
                      callback('请输入返回顺德日期相关信息!');
                    }
                    if (value === 0) {
                      if (!form.getFieldValue('returnDate')) {
                        callback('请输入所在城市!');
                      }
                    } else if (value === 1) {
                      if (!form.getFieldValue('returnDate')) {
                        callback('请输入返回顺德相关信息!');
                      }
                    }

                    callback();
                  } catch (error) {
                    callback();
                  }
                },
              },
            ],
          })(
            <Radio.Group>
              <Radio style={radioStyle} value={0}>
                一直在
                {form.getFieldValue('returnDateEnum') === 0 &&
                  getFieldDecorator('returnDate', {
                    initialValue: formData.returnDate || '',
                  })(<Input placeholder="所在城市" style={{ width: 320, marginLeft: 10 }} />)}
              </Radio>
              <Radio style={radioStyle} value={1}>
                其他
                {form.getFieldValue('returnDateEnum') === 1 &&
                  getFieldDecorator('returnDate', {
                    initialValue: formData.returnDate || '',
                  })(
                    <Input
                      placeholder="x月x日从X地抵达顺德"
                      style={{ width: 332, marginLeft: 10 }}
                    />,
                  )}
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        {form.getFieldValue('returnDateEnum') === 1 && (
          <>
            <Form.Item label="交通工具">
              {getFieldDecorator('vehicle', {
                initialValue: formData.vehicle,
                rules: [
                  {
                    required: true,
                    message: '请选择交通工具!',
                  },
                ],
              })(
                <Select placeholder="请选择居住地属性">
                  <Select.Option value={1}>飞机</Select.Option>
                  <Select.Option value={2}>火车</Select.Option>
                  <Select.Option value={3}>乘坐汽车</Select.Option>
                  <Select.Option value={4}>自驾</Select.Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="车次或航班号及座位号">
              {getFieldDecorator('trainNumber', {
                initialValue: formData.trainNumber || '',
                rules: [{ required: true, message: '请输入车次或航班号及座位号' }],
              })(<Input />)}
            </Form.Item>
          </>
        )}
        <Form.Item label="是否抵达疫区">
          {getFieldDecorator('epidemicAreaEnum', {
            initialValue: formData.epidemicAreaEnum || 0,
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  try {
                    if (value === undefined) {
                      callback('请选择是否抵达疫区!');
                    }
                    if (value === 1) {
                      if (!form.getFieldValue('epidemicArea')) {
                        callback('请输入到达疫区!');
                      }
                    }

                    callback();
                  } catch (error) {
                    callback(error);
                  }
                },
              },
            ],
          })(
            <Radio.Group>
              <Radio style={radioStyle} value={0}>
                否
              </Radio>
              <Radio style={radioStyle} value={1}>
                是
                {form.getFieldValue('epidemicAreaEnum') === 1 &&
                  getFieldDecorator('epidemicArea', {
                    initialValue: formData.epidemicArea || '',
                  })(
                    <Input
                      placeholder="湖北（不含武汉)/武汉、浙江温州"
                      style={{ width: 349, marginLeft: 10 }}
                    />,
                  )}
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        {form.getFieldValue('epidemicAreaEnum') === 1 && (
          <>
            <Form.Item label="离开日期">
              {getFieldDecorator('departureDate', {
                initialValue: formData.departureDate ? moment(formData.departureDate) : null,
                rules: [{ type: 'object', required: true, message: '请选择离开日期!' }],
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item label="停留天数">
              {getFieldDecorator('stayDays', {
                initialValue: formData.stayDays || undefined,
                rules: [{ type: 'number', required: true, message: '请输入停留天数!' }],
              })(<InputNumber min={0} max={365} />)}
              <span> 天</span>
            </Form.Item>
            <Form.Item label="离开疫区到达顺德天数">
              {getFieldDecorator('daysToShunde', {
                initialValue: formData.daysToShunde || undefined,
                rules: [{ type: 'number', required: true, message: '请输入离开疫区到达顺德天数!' }],
              })(<InputNumber min={0} max={365} />)}
              <span> 天</span>
            </Form.Item>
          </>
        )}

        <Form.Item label="居家隔离">
          {getFieldDecorator('homeSegregation', {
            initialValue: formData.homeSegregation || '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="集中隔离">
          {getFieldDecorator('centralizeSegregation', {
            initialValue: formData.centralizeSegregation || '',
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ returnworkPetitionDetails, loading }) => ({
  returnworkPetitionDetails,
  addLoading: loading.effects['returnworkPetitionDetails/addReturnworkPerson'],
  editLoading: loading.effects['returnworkPetitionDetails/editReturnworkPerson'],
}))(
  Form.create({
    name: 'person-info-form',
  })(PersonInfoForm),
);
