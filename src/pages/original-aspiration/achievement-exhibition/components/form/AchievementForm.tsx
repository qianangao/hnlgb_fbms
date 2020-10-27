import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const AchievementForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '标题',
      name: 'title',
      span: 2,
      rules: [
        { required: true, message: '请输入标题!', whitespace: true },
        { max: 64, message: '标题不超过64个字!' },
      ],
    },
    {
      label: '成果分类',
      name: 'dictResultType',
      enumsLabel: 'dictResultType',
      rules: [{ required: true, message: '请选择成果分类!', whitespace: true }],
    },

    {
      label: '成果汇总',
      name: 'resultSummary',
      type: 'editor',
      rules: [{ required: true, message: '请输入成果汇总!', whitespace: true }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaAchievementExhibition/detailAchievement',
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

AchievementForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaAchievementExhibition,
}))(AchievementForm);
