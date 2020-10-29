import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkUrl, checkPhone } from '@/utils/validators';

const SeniorUniversityForm = ({ id, loading, dispatch, form }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '大学名称',
      name: 'universityName',
      rules: [
        { required: true, message: '请输入大学名称!', whitespace: true },
        { max: 128, message: '大学名称请小于128位!', whitespace: true },
      ],
    },
    {
      label: '大学地址',
      name: 'address',
      rules: [{ required: true, message: '请填写大学地址!' }],
    },
    {
      label: '联系电话',
      name: 'phone',
      rules: [{ required: true, message: '请填写联系电话!' }, { validator: checkPhone }],
    },
    {
      label: '大学网址',
      name: 'url',
      rules: [{ required: true, message: '请填写大学网址!' }, { validator: checkUrl }],
    },
    {
      label: '大学介绍',
      name: 'universitySynopsis',
      type: 'textarea',
      span: 2,
      rules: [{ required: true, message: '请填写大学介绍!' }],
    },
    {
      label: '教学活动',
      name: 'teachingActivities',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入教学活动!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'seniorUniversity/detailSeniorUniversityInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          file: {
            uid: data.id,
            name: data.fileName,
            url: data.url,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

SeniorUniversityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.seniorUniversity,
}))(SeniorUniversityForm);
