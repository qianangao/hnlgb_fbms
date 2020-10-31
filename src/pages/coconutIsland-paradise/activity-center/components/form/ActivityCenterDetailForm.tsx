import React, { useEffect } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, type, dispatch, detailActivityCenterData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'activityCenter/detailActivityCenterInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailActivityCenterData.title}
      releaseTime={
        type === '1'
          ? detailActivityCenterData.pushTime &&
            moment(detailActivityCenterData.pushTime).format('YYYY-MM-DD')
          : detailActivityCenterData.silhouetteTime &&
            moment(detailActivityCenterData.silhouetteTime).format('YYYY-MM-DD')
      }
      orgName={detailActivityCenterData.organizationName}
      content={
        type === '1' ? detailActivityCenterData.context : detailActivityCenterData.silhouette
      }
      extraFile={type === '1' ? detailActivityCenterData.attachmentInfo : null}
    />
  );
};

export default connect(({ activityCenter, loading }) => ({
  detailActivityCenterData: activityCenter.detailActivityCenterData,
  loading: loading.models.activityCenter,
}))(DetailForm);
