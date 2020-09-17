import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

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
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>
          {detailNoticeAnnouncementData && detailNoticeAnnouncementData.subject}
        </h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailNoticeAnnouncementData && detailNoticeAnnouncementData.createOrgName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailNoticeAnnouncementData && detailNoticeAnnouncementData.releaseTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailNoticeAnnouncementData && detailNoticeAnnouncementData.content,
          }}
        />
        {detailNoticeAnnouncementData && detailNoticeAnnouncementData.attachmentId && (
          <div style={{ textAlign: 'left', margin: '20px 0px 10px 10px' }}>
            缩略图：
            <a
              href={detailNoticeAnnouncementData.attachmentId.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
              download="下载"
            >
              {detailNoticeAnnouncementData.attachmentId.name}
            </a>
          </div>
        )}
      </div>
    </Descriptions>
  );
};

export default connect(({ noticeAnnouncement, loading }) => ({
  detailNoticeAnnouncementData: noticeAnnouncement.detailNoticeAnnouncementData,
  loading: loading.models.noticeAnnouncement,
}))(DetailForm);
