import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailDailyBroadcastData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'dailyBroadcast/detailDailyBroadcast',
        payload: { id },
      });
    }
  }, [id]);

  return <DetailFormPage detailData={detailDailyBroadcastData} />;
};

export default connect(({ dailyBroadcast, loading }) => ({
  detailDailyBroadcastData: dailyBroadcast.detailDailyBroadcastData,
  loading: loading.models.dailyBroadcast,
}))(DetailForm);
