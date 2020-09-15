import React from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

const DetailFormPage = ({ detailData }) => {
  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailData && detailData.headline}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailData && detailData.createOrgName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailData && detailData.releaseTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailData && detailData.context,
          }}
        />
        {detailData && detailData.attachmentId && (
          <div style={{ textAlign: 'left', margin: '20px 0px 10px 10px' }}>
            缩略图：
            <a
              href={detailData.attachmentId.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
              download="下载"
            >
              {detailData.attachmentId.name}
            </a>
          </div>
        )}
      </div>
    </Descriptions>
  );
};

export default connect(() => ({}))(DetailFormPage);
