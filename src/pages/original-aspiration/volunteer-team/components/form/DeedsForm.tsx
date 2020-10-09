import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const DeedsForm = ({ form, id, dispatch, loading, deedsType }) => {
  const formItems = [
    {
      label: '标题',
      name: 'title',
      span: 2,
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      label: '事迹分类',
      name: deedsType === 'personal' ? 'dictPerson' : 'dictUnit',
      enumsLabel: deedsType === 'personal' ? 'dictPerson' : 'dictUnit',
      rules: [{ required: true, message: '请选择事迹分类!', whitespace: true }],
    },

    {
      label: '先进事迹简介',
      name: 'introduction',
      type: 'editor',
      rules: [{ required: true, message: '请输入先进事迹简介!', whitespace: true }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type:
            deedsType === 'personal'
              ? 'oaVolunteerTeam/detailPersonal'
              : 'oaVolunteerTeam/detailCollective',
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

DeedsForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaVolunteerTeam,
}))(DeedsForm);
