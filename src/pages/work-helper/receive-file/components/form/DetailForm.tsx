import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailPolicyStipulateData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'policyStipulate/detailPolicyStipulate',
        payload: { id },
      });
    }
  }, [id]);

  return <DetailFormPage detailData={detailPolicyStipulateData} />;
};

export default connect(({ policyStipulate, loading }) => ({
  detailPolicyStipulateData: policyStipulate.detailPolicyStipulateData,
  loading: loading.models.policyStipulate,
}))(DetailForm);
