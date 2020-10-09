import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const Detail = ({ id, dispatch, detailDeedsData, deedsType }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type:
          deedsType === 'personal'
            ? 'oaVolunteerTeam/detailPersonal'
            : 'oaVolunteerTeam/detailCollective',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailDeedsData.title}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailDeedsData.organizationName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailDeedsData.pushTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailDeedsData.introduction,
          }}
        />
      </div>
    </Descriptions>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  detailDeedsData: oaVolunteerTeam.detailDeedsData,
  loading: loading.models.oaVolunteerTeam,
}))(Detail);
