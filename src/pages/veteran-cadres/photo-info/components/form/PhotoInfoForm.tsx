import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form } from 'antd';
import { ProFormUploadButton, ProFormTextArea } from '@ant-design/pro-form';
import LgbSelectInput from '@/components/LgbSelectInput';
const BasicInfoForm = ({ form }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'realName',
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!', whitespace: true },
      ],
    },
    {
      label: '附件',
      name: 'fileId',
      rules: [
        { required: true, message: '请上传附件!', whitespace: true },
      ],
      render: (
        <span style={{ display: 'inline-flex', width: '100%' }}>
          <Form.Item name="fileId" style={{ flexGrow: 1 }}>
            <ProFormUploadButton
              name="fileId"
              action="/upload.do"
            />
          </Form.Item>
        </span>
      ),
    },
    {
      label: '描述',
      name: 'remark',
      rules: [
        { required: true, message: '请输入描述!', whitespace: true },
      ],
      render: (
        <span style={{ display: 'inline-flex', width: '100%' }}>
          <Form.Item name="fileId" style={{ flexGrow: 1 }}>
            <ProFormTextArea
              name="remark"
              placeholder="请输入描述"
            />
          </Form.Item>
        </span>
      ),
    },

  ];

  // Temp 仅做demo演示
  const selectLgbInput = (
    <Form.Item name="lgbid" rules={[{ required: true, message: '请选择老干部!' }]}>
      <LgbSelectInput />
    </Form.Item>
  );

  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

BasicInfoForm.useForm = AdvancedForm.useForm;

export default BasicInfoForm;
