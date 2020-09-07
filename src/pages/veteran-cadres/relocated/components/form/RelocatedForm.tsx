import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Form } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';
import AdvancedForm from '@/components/AdvancedForm';
import { Descriptions } from 'antd';

const RelocatedForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '	安置单位',
      name: 'resettlementUnit',
    },
    {
      label: '是否选择安置',
      name: 'isRelocation',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: true, message: '请选择是否易地居住!' }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'relocated/detailRelocated',
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
      <Descriptions title="异地安置"></Descriptions>
    </>
  );
  return (
    <AdvancedForm form={form} fields={formItems} loading={loading} headerRender={selectLgbInput} />
  );
};

RelocatedForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.relocated,
}))(RelocatedForm);
