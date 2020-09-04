import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';

const BasicInfoForm = ({ form }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'realName',
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!', whitespace: true },
      ],
    },
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

  const selectLgbInput = (
    <Form.Item name="lgbid" rules={[{ required: true, message: '请选择老干部!' }]}>
      <LgbSelectInput />
    </Form.Item>
  );
  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

BasicInfoForm.useForm = AdvancedForm.useForm;

export default BasicInfoForm;
