import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const TopicFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'healthAssessment/detailHealthAssessmentTopic',
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
  const formItems = [
    {
      label: '标题',
      name: 'subject',
      span:4,
      rules: [
        { required: true, message: '请输入测评题目!', whitespace: true },
        { max: 128, message: '测评题目请小于128位!', whitespace: true },
      ],
    },
    {
      label: '选项A',
      name: 'optionA',
      span:4,
      rules: [
        { required: true, message: '请输入选项A!', whitespace: true },
      ],
    },
    {
      label: '选项B',
      name: 'optionB',
      span:4,
      rules: [
        { required: true, message: '请输入选项B!', whitespace: true },
      ],
    },
    {
      label: '选项C',
      name: 'optionC',
      span:4,
      rules: [
        { required: true, message: '请输入选项C!', whitespace: true },
      ],
    },
    {
      label: '选项D',
      name: 'optionD',
      span:4,
      rules: [
        { required: true, message: '请输入选项D!', whitespace: true },
      ],
    },
   
  ];
  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

TopicFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.healthAssessment,
}))(TopicFrom);
