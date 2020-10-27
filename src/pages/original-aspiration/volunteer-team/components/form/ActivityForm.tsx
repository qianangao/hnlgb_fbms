import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const ActivityForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '主题',
      name: 'activityName',
      span: 4,
      rules: [
        { required: true, message: '请输入主题!', whitespace: true },
        { max: 64, message: '主题不超过64个字!' },
      ],
    },

    {
      label: '内容',
      name: 'context',
      type: 'editor',
      span: 4,
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaVolunteerTeam/getActivityDetail',
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
  loading: loading.models.oaVolunteerTeam,
}))(ActivityForm);
