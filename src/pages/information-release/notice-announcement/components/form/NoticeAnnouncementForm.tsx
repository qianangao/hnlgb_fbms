import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const NoticeAnnouncementForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '通知主题',
      name: 'subject',
      rules: [{ required: true, message: '请输入通知主题!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '通知类型',
      name: 'dictNoticeType',
      enumsLabel: 'dictNation',
      rules: [{ required: true, message: '请输入通知主题!', whitespace: true }],
    },
    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentId',
      type: 'upload',
    },
    {
      key: 'thirdlyLine',
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
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'noticeAnnouncement/detailNoticeAnnouncement',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

NoticeAnnouncementForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.noticeAnnouncement,
}))(NoticeAnnouncementForm);
