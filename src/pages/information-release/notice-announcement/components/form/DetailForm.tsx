import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailNoticeAnnouncementData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'noticeAnnouncement/detailNoticeAnnouncement',
        payload: { id, isApp: 0 },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailNoticeAnnouncementData.subject}
      releaseTime={detailNoticeAnnouncementData.releaseTime}
      orgName={detailNoticeAnnouncementData.deliverOrgName}
      content={detailNoticeAnnouncementData.content}
      extraFile={detailNoticeAnnouncementData.cephFile}
    />
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  detailNoticeAnnouncementData: noticeAnnouncement.detailNoticeAnnouncementData,
  loading: loading.models.noticeAnnouncement,
}))(DetailForm);
