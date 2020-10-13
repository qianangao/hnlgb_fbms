import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const HomeDetailForm = ({ id, dispatch, blockTypeUrl }) => {
  const [DetailData, setDetailData] = useState('');
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
      title={DetailData.title}
      releaseTime={DetailData.pushTime}
      orgName={DetailData.createOrgName}
      content={DetailData.context}
      extraFile={DetailData.attachmentInfo}
    />
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.home,
}))(HomeDetailForm);
