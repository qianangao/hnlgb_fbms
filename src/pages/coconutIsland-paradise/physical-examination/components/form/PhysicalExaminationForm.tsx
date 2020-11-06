import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';
import { Radio } from 'antd';

const PhysicalExaminationForm = ({
  form,
  id,
  dispatch,
  loading,
  getUserId,
  receivedTypeFn,
  openStatus,
}) => {
  const [receivedType, setReceivedType] = useState('false');
  const [userObj, setUserObj] = useState([]);
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
      key: 'threeLine',
      type: 'segmentation',
    },
    {
      label: receivedType === 0 ? '接收单位' : null,
      name: 'orgList',
      rules: [{ required: receivedType === 0, message: '请选择接收单位!' }],
      render: receivedType === 0 ? <OrgMultiSelectInput /> : <span style={{ display: 'none' }} />,
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
        form.setFieldsValue(fields);
        setReceivedType(fields.receivedType); // 接收类型
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
          setUserObj(userObjs);
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
      form.setFieldsValue({ orgList: [] }); // 切换类型清空
      setUserObj([]);
      receivedTypeFn(value); // 接收类型
    }
  };

  // 拿到-选择人员id
  const onChange = keys => {
    getUserId(keys);
    setUserObj(keys);
  };

  return (
    <>
      <AdvancedForm
        form={form}
        loading={loading}
        fields={formItems}
        fieldChange={fieldChangeHander}
      />
      {receivedType === 1 ? <LgbMultiSelectInput onChange={onChange} value={userObj} /> : null}
    </>
  );
};

PhysicalExaminationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.opPhysicalExamination,
}))(PhysicalExaminationForm);
