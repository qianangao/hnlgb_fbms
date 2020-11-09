import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';
import { Radio } from 'antd';

const PhysicalExaminationForm = ({ form, id, dispatch, loading, openStatus }) => {
  const [receivedType, setReceivedType] = useState();
  const formItems = [
    {
      label: '标题',
      name: 'subject',
      span: 2,
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      label: '体检时间',
      name: 'activityDate',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择体检时间!' }],
    },
    {
      label: '体检地址',
      name: 'activityAdd',
      rules: [{ required: true, message: '请输入体检地址!', whitespace: true }],
    },
    {
      label: '内容',
      name: 'content',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 4,
    },
    {
      label: '接收方式',
      name: 'receivedType',
      rules: [{ required: true, message: '请选择接收方式!' }],
      render: (
        <Radio.Group disabled={openStatus === 'modify'}>
          <Radio value={0}>单位</Radio>
          <Radio value={1}>个人</Radio>
        </Radio.Group>
      ),
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '接收单位',
      name: 'orgList',
      rules: [{ required: true, message: '请选择接收单位!' }],
      render: <OrgMultiSelectInput />,
      visible: receivedType === 0,
    },
    {
      label: '接收人员',
      name: 'userList',
      rules: [{ required: true, message: '请选择接收人员!' }],
      render: <LgbMultiSelectInput />,
      visible: receivedType === 1,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'opPhysicalExamination/detailPhysicalExamination',
          payload: { id, isApp: 0 },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        setReceivedType(fields.receivedType); // 接收类型初始化

        // 接收单位-数据转化
        if (fields.getOrgInformation) {
          const orgObj = JSON.parse(
            JSON.stringify(
              JSON.parse(JSON.stringify(fields.getOrgInformation).replace(/getOrgId/g, 'id')),
            ).replace(/getOrgName/g, 'name'),
          );
          form.setFieldsValue(fields);
          form.setFieldsValue({ orgList: orgObj });
        } else {
          form.setFieldsValue(fields);
        }

        // 接收人员-数据转化
        if (fields.getUserInformations) {
          const userObjs = JSON.parse(
            JSON.stringify(
              JSON.parse(JSON.stringify(fields.getUserInformations).replace(/getUserId/g, 'id')),
            ).replace(/getUserName/g, 'realName'),
          );
          form.setFieldsValue(fields);
          form.setFieldsValue({ userList: userObjs });
        } else {
          form.setFieldsValue(fields);
        }
      });
    }
  }, [id]);

  // 拿到-接收类型--0：按单位选  1：按人选
  const fieldChangeHander = (label, value) => {
    if (label === 'receivedType') {
      setReceivedType(value);
      form.setFieldsValue({ orgList: [] }); // 切换类型清空单位
      form.setFieldsValue({ userList: [] }); // 切换类型清空人员
    }
  };
  return (
    <>
      <AdvancedForm
        form={form}
        loading={loading}
        fields={formItems}
        fieldChange={fieldChangeHander}
      />
    </>
  );
};

PhysicalExaminationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.opPhysicalExamination,
}))(PhysicalExaminationForm);
