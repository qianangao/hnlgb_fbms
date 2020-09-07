import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const DeathInfoForm = ({ form, deathValues }) => {
  const formItems = [
    {
      label: '离世时间',
      name: 'dieDate',
      type: 'date',
      rules: [{ required: true, message: '请选择离世时间!' }],
    },
    {
      label: '离世原因',
      name: 'dieReason',
    },
    {
      label: '送别方式',
      name: 'farewell',
    },

    {
      label: '抚恤金等领取时间',
      name: 'consolationDate',
      type: 'date',
    },
    {
      label: '抚恤金等领取人',
      name: 'consolationPer',
    },
    {
      label: '抚恤金等未领取原因',
      name: 'unConsolationRea',
    },
  ];

  useEffect(() => {
    form.setFieldsValue(deathValues);
  }, [deathValues]);

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

DeathInfoForm.useForm = AdvancedForm.useForm;

export default DeathInfoForm;
