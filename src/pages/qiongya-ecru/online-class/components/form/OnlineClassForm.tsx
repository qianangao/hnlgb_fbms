import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const OnlineClassForm = ({ form, id, dispatch, loading }) => {
  // 链接地址校验
  const validateUrl = (rule, value, callback) => {
    const strRegex = /([\w.]+\/?)\S*/;
    if (value) {
      if (strRegex.test(value) === false) {
        callback('请填写格式正确的网址！');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  const formItems = [
    {
      label: '标题名称',
      name: 'name',
      rules: [{ required: true, message: '请输入标题名称!', whitespace: true }],
    },
    {
      label: '类型',
      name: 'type',
      enumsLabel: 'dictNation',
      rules: [{ required: true, message: '请选择类型!', whitespace: true }],
    },
    {
      label: '链接地址',
      name: 'url',
      rules: [{ required: true, message: '请输入链接地址!' }, { validator: validateUrl }],
    },
    {
      label: '缩略图',
      name: 'picAttachmentInfo',
      type: 'image',
      rules: [{ required: true, message: '请上传图片!' }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'onlineClass/detailOnlineClass',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          picAttachmentInfo:
            data.picAttachmentInfo.id && data.picAttachmentInfo.url
              ? {
                  uid: data.picAttachmentInfo.id,
                  name: data.picAttachmentInfo.fileName,
                  url: data.picAttachmentInfo.url,
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

OnlineClassForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, global }) => ({
  loading: loading.models.onlineClass,
  enums: global.enums,
}))(OnlineClassForm);
