import React, { useEffect, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const OnlineClassForm = ({ form, id, dispatch, loading }) => {
  const [visible, setVisible] = useState(false);
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

  const fieldChangeHander = (label, value) => {
    if (label === 'type' && value === '8adcf80a75303d66017545a9a4b4') {
      setVisible(true);
    } else if (label === 'type' && value !== '8adcf80a75303d66017545a9a4b4') {
      setVisible(false);
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
      enumsLabel: 'dict_study_type',
      rules: [{ required: true, message: '请选择类型!', whitespace: true }],
    },
    {
      label: '链接地址',
      name: 'url',
      rules: [{ required: true, message: '请输入链接地址!' }, { validator: validateUrl }],
      visible: !visible,
    },
    {
      label: '缩略图',
      name: 'cephFileInfo',
      type: 'image',
      rules: [{ required: true, message: '请上传缩略图!' }],
    },
    {
      label: '附件',
      name: 'fileInfo',
      type: 'pdf',
      visible,
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
          cephFileInfo:
            data.cephFile && data.cephFile.id && data.cephFile.url
              ? {
                  uid: data.cephFile.id,
                  name: data.cephFile.fileName,
                  url: data.cephFile.url,
                  status: 'done',
                }
              : null,

          fileInfo:
            data.fileCephFile && data.fileCephFile.id && data.fileCephFile.url
              ? {
                  uid: data.fileCephFile.id,
                  name: data.fileCephFile.fileName,
                  url: data.fileCephFile.url,
                  status: 'done',
                }
              : null,
        };
        form.setFieldsValue(fields);
        if (data.type === '8adcf80a75303d66017545a9a4b4') {
          setVisible(true);
        }
      });
    }
  }, [id]);

  return (
    <AdvancedForm
      form={form}
      loading={loading}
      fields={formItems}
      fieldChange={fieldChangeHander}
    />
  );
};

OnlineClassForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, global }) => ({
  loading: loading.models.onlineClass,
  enums: global.enums,
}))(OnlineClassForm);
