import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailReceiveFileData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'receiveFile/detailReceiveFile',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailReceiveFileData.title}
      releaseTime={detailReceiveFileData.gmtModified}
      orgName={detailReceiveFileData.createOrgName}
      content={detailReceiveFileData.content}
      extraFile={detailReceiveFileData.attachmentInfo}
    />
  );
};

export default connect(({ receiveFile, loading }) => ({
  detailReceiveFileData: receiveFile.detailReceiveFileData,
  loading: loading.models.receiveFile,
}))(DetailForm);
