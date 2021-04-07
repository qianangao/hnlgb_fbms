import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';

const SpecialtyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '兴趣爱好',
      name: 'hobby',
      enumsLabel: 'dictHobby',
      rules: [{ required: true, message: '请选择兴趣爱好!', whitespace: true }],
    },
    {
      label: '等级',
      name: 'level',
      enumsLabel: 'dictHobbyLevel',
      rules: [{ required: true, message: '请选择等级!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'vcHobbyInfo/detailHobby',
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
      <Descriptions title="兴趣爱好" />
    </>
  );
  return id ? (
    <AdvancedForm form={form} loading={loading} fields={formItems} />
  ) : (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

SpecialtyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(SpecialtyForm);
