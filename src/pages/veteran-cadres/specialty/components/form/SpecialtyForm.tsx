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
      label: '专业特长',
      name: 'hobby',
      rules: [
        { required: true, message: '请输入专业特长!', whitespace: true },
      ],
    },
    {
      label: '成果',
      name: 'achievements',
      rules: [
        { required: true, message: '请输入成果!', whitespace: true },
      ],
    },
    {
      label: '类型',
      name: 'administrativeRank',
      enumsLabel: 'dictTreatmentNow',
      rules: [
        { required: true, message: '请输选择类型!', whitespace: true },
      ],
    },
    {
      label: '技术等级',
      name: 'titleGrade',
      rules: [
        { required: true, message: '请输入技术等级!', whitespace: true },
      ],
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
