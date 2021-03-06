import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const StudyRecordForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '学习主题',
      name: 'theme',
      rules: [{ required: true, message: '请输入学习主题!', whitespace: true }],
    },
    {
      label: '学习时间',
      name: 'time',
      type: 'date',
      rules: [{ required: true, message: '请选择学习时间!', whitespace: true }],
    },
    {
      label: '主持人',
      name: 'host',
      rules: [{ required: true, message: '请输入主持人!', whitespace: true }],
    },
    {
      label: '学习形式',
      name: 'dictForm',
      enumsLabel: 'dictForm',
      rules: [{ required: true, message: '请选择学习形式!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '学习要点',
      name: 'points',
      type: 'editor',
      rules: [{ required: true, message: '请输入学习要点!', whitespace: true }],
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'studyRecord/detailStudyRecord',
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

StudyRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.studyRecord,
}))(StudyRecordForm);
