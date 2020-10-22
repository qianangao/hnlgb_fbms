import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const HomeDetailForm = ({ id, dispatch, blockTypeUrl }) => {
  const [detailData, setDetailData] = useState('');
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: `home/${blockTypeUrl}`,
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        setDetailData(fields);
      });
    }
  }, [id]);
  return (
    <DetailFormPage
      title={detailData.title || detailData.headline || detailData.subject}
      releaseTime={detailData.pushTime}
      orgName={detailData.createOrgName}
      content={detailData.context || detailData.resultSummary}
      extraFile={detailData.attachmentInfo}
    />
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.home,
}))(HomeDetailForm);
