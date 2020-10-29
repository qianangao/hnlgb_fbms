import React, { useEffect, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import { Radio } from 'antd';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const ReceiveFileForm = ({ form, id, dispatch, loading }) => {
  const [receiveType, setReceivedType] = useState('false');

  // 获取-工作人员列表
  const getWorkLgbs = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'receiveFile/getWorkLgbs',
        payload: { ...getMemberParams },
        resolve,
      });
    });
  const formItems = [
    {
      label: '标题',
      name: 'title',
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentInfo',
      type: 'upload',
    },
    {
      key: 'threeLine',
      type: 'segmentation',
    },
    {
      label: '接收方式',
      name: 'receiveType',
      rules: [{ required: true, message: '请选择接收方式!' }],
      render: (
        <Radio.Group>
          <Radio value={0}>单位</Radio>
          <Radio value={1}>个人</Radio>
        </Radio.Group>
      ),
    },
    {
      key: 'fourLine',
      type: 'segmentation',
    },
    {
      label: '接收单位',
      name: 'receiveList',
      rules: [{ required: true, message: '请选择接收单位!' }],
      render: <OrgMultiSelectInput />,
      visible: receiveType === 0,
    },
    {
      label: '接收人员',
      name: 'userList',
      rules: [{ required: true, message: '请选择接收人员!' }],
      render: <LgbMultiSelectInput getLgbs={getWorkLgbs} />,
      visible: receiveType === 1,
    },
    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '内容',
      name: 'content',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 2,
    },
  ];

  // 拿到-接收类型--0：按单位选  1：按人选
  const fieldChangeHander = (label, value) => {
    if (label === 'receiveType') {
      setReceivedType(value);
      form.setFieldsValue({ receiveList: [] }); // 切换类型清空单位
      form.setFieldsValue({ userList: [] }); // 切换类型清空人员
    }
  };

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'receiveFile/detailReceiveFile',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          attachmentInfo: data.attachmentInfo &&
            data.attachmentInfo.id && {
              url: data.attachmentInfo.url,
              uid: data.attachmentInfo.id,
              name: data.attachmentInfo.fileName,
              status: 'done',
            },
        };
        form.setFieldsValue(fields);
        setReceivedType(fields.receiveType); // 接收类型初始化
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

ReceiveFileForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.receiveFile,
}))(ReceiveFileForm);
