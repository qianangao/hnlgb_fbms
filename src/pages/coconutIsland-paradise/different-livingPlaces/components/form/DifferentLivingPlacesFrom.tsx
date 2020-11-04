import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Radio, Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const DifferentLivingPlacesFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'differentLivingPlaces/detailDifferentLivingInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        fields.address = data.addressCode
          ? {
              value: data.addressCode,
              label: data.address,
            }
          : null;
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
      <Descriptions title="异地居住地址" size="middle" />
    </>
  );
  const formItems = [
    {
      label: '省内/省外居住',
      name: 'isProvince',
      rules: [{ required: true, message: '请选择省内/省外居住!' }],
      render: (
        <Radio.Group>
          <Radio.Button value={0}>省内</Radio.Button>
          <Radio.Button value={1}>省外</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: '异地居住详细地址',
      name: 'addressDiy',
      rules: [{ required: true, message: '请输入异地居住详细地址!' }],
    },
  ];
  return id ? (
    <AdvancedForm form={form} fields={formItems} loading={loading} />
  ) : (
    <AdvancedForm form={form} loading={loading} headerRender={selectLgbInput} fields={formItems} />
  );
};

DifferentLivingPlacesFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.differentLivingPlaces,
}))(DifferentLivingPlacesFrom);
