import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const Detail = ({ id, dispatch, detailActivityData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaActivityHome/detailActivity',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailActivityData.activityTitle}
      orgName={detailActivityData.organizationName}
      releaseTime={detailActivityData.createTime}
      content={detailActivityData.activityContent}
    />
  );
};

export default connect(({ oaActivityHome, loading }) => ({
  detailActivityData: oaActivityHome.detailActivityData,
  loading: loading.models.oaActivityHome,
}))(Detail);
