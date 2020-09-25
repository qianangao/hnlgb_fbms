import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ExperienceForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '标题',
      name: 'title',
      span: 2,
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },

    {
      label: '工作经验简介',
      name: 'workIntroduction',
      type: 'editor',
      rules: [{ required: true, message: '请输入工作经验简介!', whitespace: true }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaExperienceIntroduction/detailExperience',
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

ExperienceForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaExperienceIntroduction,
}))(ExperienceForm);
