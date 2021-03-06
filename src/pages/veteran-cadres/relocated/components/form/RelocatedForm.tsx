import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Form, Descriptions } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';
import AdvancedForm from '@/components/AdvancedForm';

const RelocatedForm = ({ form, id, dispatch, loading }) => {
  const [resettlementUnitVisible, setResettlementUnitVisible] = useState(false);
  const formItems = [
    {
      hidden: true,
      name: 'id',
    },
    {
      label: '是否选择安置',
      name: 'isRelocation',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: true, message: '请选择是否易地居住!' }],
    },

    {
      label: '安置居住地',
      visible: resettlementUnitVisible,
      name: 'resettlementUnit',
    },
  ];

  const fieldChangeHander = (label, value) => {
    if (label === 'isRelocation') {
      setResettlementUnitVisible(!!value);
    }
  };

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
        setResettlementUnitVisible(!!data.isRelocation);
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
      <Descriptions title="易地安置" />
    </>
  );
  return id ? (
    <AdvancedForm
      form={form}
      fields={formItems}
      loading={loading}
      fieldChange={fieldChangeHander}
    />
  ) : (
    <AdvancedForm
      form={form}
      fields={formItems}
      loading={loading}
      fieldChange={fieldChangeHander}
      headerRender={selectLgbInput}
    />
  );
};

RelocatedForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.relocated,
}))(RelocatedForm);
