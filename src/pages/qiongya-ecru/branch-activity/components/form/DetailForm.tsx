import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';
import PartyPeopleTable from './PartyPeopleTable';

const DetailForm = ({ dispatch, id, detailBranchActivityData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'branchActivity/detailBranchActivity',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <div>
      <Descriptions size="middle" title="活动信息">
        <Descriptions.Item label="活动名称">
          {detailBranchActivityData.activityName}
        </Descriptions.Item>
        <Descriptions.Item label="支持人">{detailBranchActivityData.host}</Descriptions.Item>
        <Descriptions.Item label="活动日期">
          {detailBranchActivityData.activityDate}
        </Descriptions.Item>
        <Descriptions.Item label="活动地点">
          {detailBranchActivityData.activityAdd}
        </Descriptions.Item>
        <Descriptions.Item label="支部名称">{detailBranchActivityData.partyName}</Descriptions.Item>
        <Descriptions.Item label="缩略图">
          {detailBranchActivityData && detailBranchActivityData.picAttachmentInfo && (
            <a href={detailBranchActivityData.picAttachmentInfo.url}>
              {detailBranchActivityData.picAttachmentInfo.name}
            </a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="附件" span={22}>
          {detailBranchActivityData && detailBranchActivityData.attachmentInfo && (
            <a href={detailBranchActivityData.attachmentInfo.url}>
              {detailBranchActivityData.attachmentInfo.name}
            </a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="活动简介" span={22}>
          {detailBranchActivityData.context}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" title="活动成员">
        <Descriptions.Item span={22}>
          <PartyPeopleTable id={detailBranchActivityData.partyId} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default connect(({ branchActivity, loading }) => ({
  detailBranchActivityData: branchActivity.detailBranchActivityData,
  loading: loading.models.branchActivity,
}))(DetailForm);
