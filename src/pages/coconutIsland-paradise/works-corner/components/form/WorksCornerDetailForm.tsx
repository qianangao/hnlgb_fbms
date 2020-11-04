import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Spin } from 'antd';
import DetailCornerForm from '@/components/DetailCornerForm';

const DetailForm = ({ id, dispatch, detailWorksCornerData, loading }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'worksCorner/detailWorksCornerInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Spin spinning={loading}>
      <DetailCornerForm
        title={detailWorksCornerData.headline}
        releaseTime={detailWorksCornerData.releaseTime}
        userName={detailWorksCornerData.createUserName}
        content={detailWorksCornerData.context}
        extraFile={detailWorksCornerData.attachmentInfo}
      />
    </Spin>
  );
};

export default connect(({ worksCorner, loading }) => ({
  detailWorksCornerData: worksCorner.detailWorksCornerData,
  loading: loading.effects['worksCorner/detailWorksCornerInfo'],
}))(DetailForm);
