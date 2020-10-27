import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ActivityForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '标题',
      name: 'activityTitle',
      span: 2,
      rules: [
        { required: true, message: '请输入标题!', whitespace: true },
        { max: 64, message: '标题不超过64个字!' },
      ],
    },
    {
      label: '活动分类',
      name: 'dictActivityClassification',
      enumsLabel: 'dictActivityClassification',
      rules: [{ required: true, message: '请选择活动分类!', whitespace: true }],
    },

    {
      label: '内容',
      name: 'activityContent',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaActivityHome/detailActivity',
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

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

ActivityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaActivityHome,
}))(ActivityForm);
