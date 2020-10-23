import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const CommunityForm = ({ form, dispatch, id }) => {
  const formItems = [
    {
      label: '社团名称',
      name: 'clubName',
      span: 2,
      rules: [{ required: true, message: '请输入社团名称!', whitespace: true }],
    },
    {
      label: '社团类型',
      name: 'dictClubType',
      enumsLabel: 'dictClubType',
      rules: [{ required: true, message: '请选择社团类型!', whitespace: true }],
    },
    {
      label: '社团简介',
      name: 'clubIntroduction',
      type: 'textArea',
      span: 4,
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaCommunity/getCommunityDetail',
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

  return (
    <>
      <AdvancedForm form={form} loading={false} fields={formItems} />
    </>
  );
};

CommunityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(CommunityForm);
