import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TeamForm from './form/TeamForm';

const TeamModifyModal = ({ dispatch, teamModifyModalVisible, actionRef }) => {
  const [form] = TeamForm.useForm();
  const [teamId, setTeamId] = useState('');

  const showModal = id => {
    setTeamId(id);
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        teamModifyModalVisible: true,
      },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);
  // useEffect(() => {
  //   if (teamId) {
  //     dispatch({
  //       type: 'oaVolunteerTeam/detailTeam',
  //       payload: { id: teamId },
  //     });
  //   }
  // }, [teamId]);

  const hideModal = () => {
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        teamModifyModalVisible: false,
      },
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaVolunteerTeam/updateTeam`,
          payload: {
            ...values,
            id: teamId,
          },
        });
      })
      .catch();
  };
  return (
    <Modal
      title="编辑志愿团队"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={teamModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      onOk={handleOk}
    >
      <TeamForm form={form} id={teamId} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  teamModifyModalVisible: oaVolunteerTeam.teamModifyModalVisible,
  communityDetailData: oaVolunteerTeam.communityDetailData,
  loading: loading.models.oaVolunteerTeam,
}))(TeamModifyModal);
