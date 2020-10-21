import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailNoticeAnnouncementData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'noticeAnnouncement/detailNoticeAnnouncement',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailNoticeAnnouncementData.subject}
      releaseTime={detailNoticeAnnouncementData.releaseTime}
      orgName={detailNoticeAnnouncementData.createOrgName}
      content={detailNoticeAnnouncementData.content}
      extraFile={detailNoticeAnnouncementData.attachmentInfo}
    />
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  detailNoticeAnnouncementData: noticeAnnouncement.detailNoticeAnnouncementData,
  loading: loading.models.noticeAnnouncement,
}))(DetailForm);
