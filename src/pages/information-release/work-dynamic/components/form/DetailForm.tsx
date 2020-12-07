import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailWorkDynamicData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'workDynamic/detailWorkDynamic',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailWorkDynamicData.headline}
      releaseTime={detailWorkDynamicData.releaseTime}
      orgName={detailWorkDynamicData.createOrgName}
      content={detailWorkDynamicData.context}
      extraFile={detailWorkDynamicData.cephFile}
    />
  );
};

export default connect(({ workDynamic, loading }) => ({
  detailWorkDynamicData: workDynamic.detailWorkDynamicData,
  loading: loading.models.workDynamic,
}))(DetailForm);
