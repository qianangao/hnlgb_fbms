import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const HealthEducationFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'healthEducation/detailHealthEducationInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          context: data.content,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);
  const formItems = [
    {
      label: '标题',
      name: 'theme',
      rules: [
        { required: true, message: '请输入标题名称!', whitespace: true },
        { max: 128, message: '保健教育名称请小于128位!', whitespace: true },
      ],
    },
    {
      label: '内容',
      name: 'context',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
    },
  ];
  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

HealthEducationFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.healthEducation,
}))(HealthEducationFrom);
