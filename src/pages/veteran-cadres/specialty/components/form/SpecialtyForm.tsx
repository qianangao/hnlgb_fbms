import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { Form } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';
import { Descriptions } from 'antd';

const SpecialtyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '专业特长',
      name: 'hobby',
      rules: [{ required: true, message: '请输入专业特长!', whitespace: true }],
    },
    {
      label: '成果',
      name: 'achievements',
      rules: [{ required: true, message: '请输入成果!', whitespace: true }],
    },
    {
      label: '类型',
      name: 'administrativeRank',
      enumsLabel: 'dictTreatmentNow',
      rules: [{ required: true, message: '请输选择类型!', whitespace: true }],
    },
    {
      label: '技术等级',
      name: 'titleGrade',
      rules: [{ required: true, message: '请输入技术等级!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'specialty/detailSpecialty',
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
      <Descriptions title="银色人才"></Descriptions>
    </>
  );
  return (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

SpecialtyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(SpecialtyForm);
