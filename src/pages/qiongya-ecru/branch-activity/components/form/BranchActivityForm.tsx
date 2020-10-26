import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const BranchActivityForm = ({ form, id, dispatch, loading, partyData }) => {
  const formItems = [
    {
      label: '活动名称',
      name: 'activityName',
      rules: [{ required: true, message: '请输入活动名称!', whitespace: true }],
    },
    {
      label: '活动类型',
      name: 'dictOrgLife',
      enumsLabel: 'dictOrgLife',
      rules: [{ required: true, message: '请选择活动类型!', whitespace: true }],
    },
    {
      label: '支部名称',
      name: 'partyId',
      enumsItems: partyData,
      rules: [{ required: true, message: '请选择支部名称!', whitespace: true }],
    },
    {
      label: '支持人',
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
            data.picAttachmentInfo.id && data.picAttachmentInfo.url
              ? {
                  uid: data.picAttachmentInfo.id,
                  name: data.picAttachmentInfo.fileName,
                  url: data.picAttachmentInfo.url,
                  status: 'done',
                }
              : null,
          attachmentInfo:
            data.attachmentInfo.id && data.attachmentInfo.url
              ? {
                  uid: data.attachmentInfo.id,
                  name: data.attachmentInfo.fileName,
                  url: data.attachmentInfo.url,
                  status: 'done',
                }
              : null,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  useEffect(() => {
    // 支部-列表
    dispatch({
      type: 'branchInformation/branchInformationList',
      payload: { current: 1, pageSize: 10000 },
    });
  }, []);
  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

BranchActivityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, global, branchInformation }) => ({
  loading: loading.models.branchActivity,
  enums: global.enums,
  branchInformationData: branchInformation.branchInformationData,
  partyData: branchInformation.partyData,
}))(BranchActivityForm);
