import { Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';

const { Option } = Select;
const BranchActivityForm = ({
  form,
  id,
  dispatch,
  loading,
  branchInformationData,
  partyData,
  branchLoading,
}) => {
  const [isUser, setIsUser] = useState();
  const formItems = [
    {
      label: '活动名称',
      name: 'activityName',
      rules: [{ required: true, message: '请输入活动名称!', whitespace: true }],
    },
    {
      label: '活动类型',
      name: 'dictActivityChildType',
      enumsLabel: 'dictOrgLife',
      rules: [{ required: true, message: '请选择活动类型!', whitespace: true }],
    },
    {
      label: '主持人',
      name: 'host',
      rules: [{ required: true, message: '请输入支持人!', whitespace: true }],
    },
    {
      label: '活动日期',
      name: 'activityDate',
      type: 'date',
      rules: [{ required: true, message: '请选择活动日期!', whitespace: true }],
    },
    {
      label: '活动地点',
      name: 'activityAdd',
      rules: [{ required: true, message: '请输入活动地点!', whitespace: true }],
    },
    {
      label: '主持活动支部',
      name: 'partyId',
      rules: [{ required: true, message: '请选择主持活动支部!', whitespace: true }],
      enumsItems: partyData,
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '缩略图',
      name: 'picAttachmentInfo',
      type: 'image',
      rules: [{ required: false, message: '请上传图片!' }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '接收方式',
      name: 'isUser',
      rules: [{ required: true, message: '请选择接收方式!' }],
      render: (
        <Radio.Group>
          <Radio value={0}>支部</Radio>
          <Radio value={1}>个人</Radio>
        </Radio.Group>
      ),
    },
    {
      key: 'thirdlyLine',
      type: 'segmentation',
    },
    {
      label: '接收支部',
      name: 'partyIds',
      rules: [{ required: true, message: '请选择接收支部!' }],
      render: (
        <Select style={{ width: '100%' }} mode="tags" loading={branchLoading}>
          {branchInformationData &&
            branchInformationData.data &&
            branchInformationData.data.map(item => {
              return <Option key={item.id}>{item.partyName}</Option>;
            })}
        </Select>
      ),
      visible: isUser === 0,
    },
    {
      label: '接收人员',
      name: 'userIds',
      rules: [{ required: true, message: '请选择接收人员!' }],
      render: <LgbMultiSelectInput />,
      visible: isUser === 1,
    },
    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentInfo',
      type: 'upload',
      rules: [{ required: false, message: '请上传附件!' }],
    },
    {
      key: 'thirdlyLine',
      type: 'segmentation',
    },
    {
      label: '活动详情',
      name: 'context',
      type: 'editor',
      rules: [{ required: true, message: '请输入活动详情!', whitespace: true }],
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'branchInformation/branchInformationList',
        payload: {},
      });

      new Promise(resolve => {
        dispatch({
          type: 'branchActivity/detailBranchActivity',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          picAttachmentInfo:
            data.picAttachmentInfo && data.picAttachmentInfo.id && data.picAttachmentInfo.url
              ? {
                  uid: data.picAttachmentInfo.id,
                  name: data.picAttachmentInfo.fileName,
                  url: data.picAttachmentInfo.url,
                  status: 'done',
                }
              : null,
          attachmentInfo:
            data.attachmentInfo && data.attachmentInfo.id && data.attachmentInfo.url
              ? {
                  uid: data.attachmentInfo.id,
                  name: data.attachmentInfo.fileName,
                  url: data.attachmentInfo.url,
                  status: 'done',
                }
              : null,
        };
        fields.userIds = fields.userInfos;
        setIsUser(fields.isUser);
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  useEffect(() => {
    // 支部-列表
    dispatch({
      type: 'branchInformation/branchInformationList',
      payload: {},
    });
  }, []);

  // 拿到-接收类型--0：按单位选  1：按人选
  const fieldChangeHander = (label, value) => {
    if (label === 'isUser') {
      setIsUser(value);
      form.setFieldsValue({ partyIds: [] }); // 切换类型清空单位
      form.setFieldsValue({ userIds: [] }); // 切换类型清空人员
    }
  };

  return (
    <AdvancedForm
      form={form}
      loading={loading}
      fields={formItems}
      fieldChange={fieldChangeHander}
    />
  );
};

BranchActivityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, global, branchInformation }) => ({
  loading: loading.models.branchActivity,
  enums: global.enums,
  branchInformationData: branchInformation.branchInformationData,
  partyData: branchInformation.partyData,
  branchLoading: loading.models.branchInformation,
}))(BranchActivityForm);
