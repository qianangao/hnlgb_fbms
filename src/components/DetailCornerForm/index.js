import React from 'react';
import { connect } from 'umi';

const DetailCornerForm = ({ title, releaseTime, userName, content, extraFile }) => {
  return (
    <div style={{ margin: 5 }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div style={{ textAlign: 'center' }}>
        <span style={{ marginRight: 40 }}>发布人员：{userName}</span>
        <span>
          发布时间：
          {releaseTime}
        </span>
      </div>
      <hr style={{ color: '#CCCCCC' }} />
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {extraFile && (
        <div style={{ textAlign: 'left', marginTop: 20 }}>
          <div>图片：</div>
          <img alt={extraFile.fileName} src={extraFile.url} />
        </div>
      )}
    </div>
  );
};

export default connect(() => ({}))(DetailCornerForm);
