import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const HospitalRegistrationFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'hospitalRegistration/detailHospitalRegistrationInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);
  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Form.Item name="userId" rules={[{ required: true, message: '请选择老干部!' }]}>
        <LgbSelectInput />
      </Form.Item>
      <Descriptions title="住院登记" />
    </>
  );
  const formItems = [
    {
      label: '医院',
      name: 'hospitalName',
      rules: [{ required: true, message: '请输入医院!' }],
    },
    {
      label: '住院时间',
      name: 'lengthOfStay',
      type: 'date',
      rules: [{ required: true, message: '请选择住院时间!' }],
    },
    {
      label: '科室',
      name: 'department',
      rules: [{ required: true, message: '请输入科室病床!' }],
    },
    {
      label: '病床',
      name: 'hospitalBed',
      rules: [{ required: true, message: '请输入科室病床!' }],
    },
    {
      label: '出院时间',
      name: 'dischargeTime',
      type: 'date',
      rules: [{ required: false, message: '请选择出院时间!' }],
    },
    {
      label: '是否看望',
      name: 'isVisit',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: false, message: '请选择是否看望!' }],
    },
    {
      label: '住院病情',
      name: 'condition',
      rules: [{ required: true, message: '请输入住院病情!' }],
    },
    {
      label: '治疗结果',
      name: 'therapeuticOutcome',
      rules: [{ required: false, message: '请输入治疗结果!' }],
    },
  ];
  return id ? (
    <AdvancedForm form={form} fields={formItems} loading={loading} />
  ) : (
    <AdvancedForm form={form} loading={loading} headerRender={selectLgbInput} fields={formItems} />
  );
};

HospitalRegistrationFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.hospitalRegistration,
}))(HospitalRegistrationFrom);
