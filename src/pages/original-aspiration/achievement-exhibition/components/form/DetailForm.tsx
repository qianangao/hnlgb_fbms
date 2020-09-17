import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const DetailForm = ({ id, dispatch, detailAchievementData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaAchievementExhibition/detailAchievement',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailAchievementData.title}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailAchievementData.organizationName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailAchievementData.pushTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailAchievementData.resultSummary,
          }}
        />
      </div>
    </Descriptions>
  );
};

export default connect(({ oaAchievementExhibition, loading }) => ({
  detailAchievementData: oaAchievementExhibition.detailAchievementData,
  loading: loading.models.oaAchievementExhibition,
}))(DetailForm);
