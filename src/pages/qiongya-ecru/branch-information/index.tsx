import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import MembersModifyModal from './components/MembersModifyModal';
import { Modal, Button } from 'antd';

const BranchInformation = ({ dispatch, branchActivity }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const membersModifyModelRef = useRef({});
  const [visible, setVisible] = useState(true);
  const { feachRemindData } = branchActivity;
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictTreatmentNow',
          'dictPartyType',
          'dictPartyCategory',
          'dictPartyNature', // 支部性质
          'dictPartySource', // 支部来源
        ],
      },
    });

    dispatch({
      type: `branchActivity/feachRemind`, // 请求放在model里面
      payload: {},
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'branchInformation/selectOrgChange',
      payload: orgId,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const openMembersModifyModal = item => {
    membersModifyModelRef.current.showModal(item.id);
  };
  const hideModals = () => {
    setVisible(false);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openAddModal={openAddModal}
        openModifyModal={openModifyModal}
        openMembersModifyModal={openMembersModifyModal}
      />
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <MembersModifyModal actionRef={membersModifyModelRef} />
      {feachRemindData && feachRemindData.isRemind && (
        <Modal
          title="弹框"
          centered
          visible={visible}
          forceRender
          onCancel={hideModals}
          footer={[
            <Button key="ok" type="primary" onClick={hideModals}>
              确认
            </Button>,
          ]}
        >
          <div>当前单位退休党员数量已超过3人，请及时组建支部</div>
        </Modal>
      )}
    </OrgTreeLayout>
  );
};

export default connect(({ branchInformation, branchActivity }) => ({
  branchInformation,
  branchActivity,
}))(BranchInformation);
