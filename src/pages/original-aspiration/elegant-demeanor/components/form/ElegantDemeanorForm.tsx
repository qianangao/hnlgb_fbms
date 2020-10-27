import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ElegantDemeanorForm = ({ form, id, dispatch, loading }) => {
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
      label: '五老类型',
      name: 'type',
      enumsLabel: 'dictFiveOldType',
      rules: [{ required: true, message: '请选择五老类型!' }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '缩略图',
      name: 'attachmentInfo',
      type: 'image',
      rules: [{ required: true, message: '请上传缩略图!' }],
    },

    {
      label: '内容',
      name: 'context',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!' }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaElegantDemeanor/detailElegantDemeanor',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          attachmentInfo:
            data.attachmentInfo && data.attachmentInfo.id && data.attachmentInfo.url
              ? {
                  uid: data.attachmentInfo.id,
                  name: data.attachmentInfo.name,
                  url: data.attachmentInfo.url,
                  status: 'done',
                }
              : null,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

ElegantDemeanorForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaElegantDemeanor,
}))(ElegantDemeanorForm);
