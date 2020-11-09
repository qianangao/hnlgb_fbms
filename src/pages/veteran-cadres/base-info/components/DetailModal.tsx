import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions, Spin, Button } from 'antd';

const DetailModal = ({ dispatch, vcBasicInfo, actionRef, enums, loading }) => {
  const { lgbDetailData, lgbFamilyData, lgbPartTimeData, lgbHealthyData } = vcBasicInfo;
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const showModal = id => {
    if (id) {
      dispatch({
        type: 'vcBasicInfo/getLgbDetail',
        payload: { id },
      });
      dispatch({
        type: 'vcBasicInfo/getFamilyLgb',
        payload: { id },
      });
      dispatch({
        type: 'vcBasicInfo/getPartTimeLgb',
        payload: { id },
      });
      dispatch({
        type: 'vcBasicInfo/getHealthyLgb',
        payload: { id },
      });

      setDetailModalVisible(true);
    }
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setDetailModalVisible(false);
  };

  return (
    <Modal
      title="老干部详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button key="ok" type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Descriptions title="基本信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="姓名">{lgbDetailData.realName}</Descriptions.Item>
          <Descriptions.Item label="曾用名">{lgbDetailData.nameUsedBefore}</Descriptions.Item>
          <Descriptions.Item label="性别">
            {enums.dictSex && enums.dictSex[lgbDetailData.dictSex]}
          </Descriptions.Item>
          <Descriptions.Item label="工作单位">{lgbDetailData.organizationName}</Descriptions.Item>
          <Descriptions.Item label="籍贯">{lgbDetailData.nativePlace}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{lgbDetailData.idCard}</Descriptions.Item>
          <Descriptions.Item label="手机号码">{lgbDetailData.phonenumber}</Descriptions.Item>
          <Descriptions.Item label="现管单位">{lgbDetailData.nowThePipeUnits}</Descriptions.Item>
          <Descriptions.Item label="单位性质">
            {enums.dictUnitNature && enums.dictUnitNature[lgbDetailData.dictUnitNature]}
          </Descriptions.Item>
          <Descriptions.Item label="民族">
            {enums.dictNation && enums.dictNation[lgbDetailData.dictNation]}
          </Descriptions.Item>
          <Descriptions.Item label="出生日期">{lgbDetailData.dateOfBirth}</Descriptions.Item>
          <Descriptions.Item label="入党时间">{lgbDetailData.partyTime}</Descriptions.Item>
          <Descriptions.Item label="政治面貌">
            {enums.dictPoliticalStatus &&
              enums.dictPoliticalStatus[lgbDetailData.dictPoliticalStatus]}
          </Descriptions.Item>
          {/* TODO 阴历日期计算生日提醒暂未实现，后续观察是否保留 */}
          {/* <Descriptions.Item label="生日">
            {lgbDetailData.birthday + (lgbDetailData.solarOrLunar === 1 ? '阴历' : '阳历')}
          </Descriptions.Item> */}
          <Descriptions.Item label="离退休类型">
            {enums.dictRetirementType && enums.dictRetirementType[lgbDetailData.dictRetirementType]}
          </Descriptions.Item>
          <Descriptions.Item label="文化程度">
            {enums.dictDegree && enums.dictDegree[lgbDetailData.dictDegree]}
          </Descriptions.Item>
          <Descriptions.Item label="参加工作时间">{lgbDetailData.startWorkTime}</Descriptions.Item>
          <Descriptions.Item label="离退休时间">{lgbDetailData.retirementDate}</Descriptions.Item>
          <Descriptions.Item label="现享受待遇批准时间">
            {lgbDetailData.treatmentApproveTime}
          </Descriptions.Item>
          <Descriptions.Item label="现享受待遇">
            {enums.dictTreatmentNow && enums.dictTreatmentNow[lgbDetailData.dictTreatmentNow]}
          </Descriptions.Item>
          <Descriptions.Item label="职级">
            {enums.dictRetirementLevel &&
              enums.dictRetirementLevel[lgbDetailData.dictRetirementLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="原工作单位及职务">
            {lgbDetailData.originalUnitAndPosition}
          </Descriptions.Item>
          <Descriptions.Item label="原工作单位性质">
            {enums.dictAllergenUnitNaturel &&
              enums.dictAllergenUnitNaturel[lgbDetailData.dictAllergenUnitNaturel]}
          </Descriptions.Item>
          <Descriptions.Item label="层级">
            {enums.dictHierarchy && enums.dictHierarchy[lgbDetailData.hierarchy]}
          </Descriptions.Item>
          <Descriptions.Item label="统计标志">
            {lgbDetailData.statisticSymbol === 1 ? '是' : '否'}
          </Descriptions.Item>
          <Descriptions.Item label="是否异地居住">
            {lgbDetailData.isDifferentLive === 1 ? '是' : '否'}
          </Descriptions.Item>
          <Descriptions.Item label="待遇批准文号">
            {lgbDetailData.treatmentApprovalNumber}
          </Descriptions.Item>
          <Descriptions.Item label="提高享受待遇情况">
            {lgbDetailData.improveTreatment}
          </Descriptions.Item>
          <Descriptions.Item label="参加革命工作时期">
            {enums.dictRevolutionPeriod &&
              enums.dictRevolutionPeriod[lgbDetailData.dictRevolutionPeriod]}
          </Descriptions.Item>
          <Descriptions.Item label="享受医疗待遇情况">
            {enums.dictMedicalTreatment &&
              enums.dictMedicalTreatment[lgbDetailData.dictMedicalTreatment]}
          </Descriptions.Item>
          <Descriptions.Item label="奖罚情况">{lgbDetailData.awardSituation}</Descriptions.Item>
          <Descriptions.Item label="特殊贡献">
            {lgbDetailData.specialContribution}
          </Descriptions.Item>
          <Descriptions.Item label="是否在世">
            {lgbDetailData.isDead === 1 ? '否' : '是'}
          </Descriptions.Item>
          <Descriptions.Item label="离世时间">{lgbDetailData.dieDate}</Descriptions.Item>
          <Descriptions.Item label="身份性质">
            {enums.dictIdentity && enums.dictIdentity[lgbDetailData.dictIdentity]}
          </Descriptions.Item>
          <Descriptions.Item label="组织区域">
            {enums.dictOrganizationArea &&
              enums.dictOrganizationArea[lgbDetailData.dictOrganizationArea]}
          </Descriptions.Item>
          <Descriptions.Item label="职称">{lgbDetailData.academicTitles}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="家庭信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="常住地址" span={{ xxl: 4, xl: 3, lg: 2 }}>
            {`${lgbFamilyData.residentAddressList || ''} ${lgbFamilyData.residentAddressDiy || ''}`}
          </Descriptions.Item>
          <Descriptions.Item label="家庭住址" span={{ xxl: 4, xl: 3, lg: 2 }}>
            {`${lgbFamilyData.homeNameList || ''} ${lgbFamilyData.homeAddressDiy || ''}`}
          </Descriptions.Item>

          <Descriptions.Item label="婚姻状况">
            {enums.dictMarriage && enums.dictMarriage[lgbFamilyData.dictMarriage]}
          </Descriptions.Item>
          <Descriptions.Item label="居住状态">
            {enums.dictLiveStatu && enums.dictLiveStatu[lgbFamilyData.dictLiveStatu]}
          </Descriptions.Item>
          <Descriptions.Item label="购房情况">{lgbFamilyData.purchaseSituation}</Descriptions.Item>
          <Descriptions.Item label="住房建筑面积">{lgbFamilyData.structureArea}</Descriptions.Item>
          <Descriptions.Item label="子女数">{lgbFamilyData.childrenNum}</Descriptions.Item>
          <Descriptions.Item label="无劳动能力子女数">
            {lgbFamilyData.noworkChildrenNum}
          </Descriptions.Item>
          <Descriptions.Item label="赡养人数">{lgbFamilyData.supportNum}</Descriptions.Item>
          <Descriptions.Item label="抚养人数">{lgbFamilyData.dependencyNum}</Descriptions.Item>
          <Descriptions.Item label="住宅电话">{lgbFamilyData.telephone}</Descriptions.Item>
          <Descriptions.Item label="固定电话1">{lgbFamilyData.telephone1}</Descriptions.Item>
          <Descriptions.Item label="固定电话2">{lgbFamilyData.telephone2}</Descriptions.Item>
          <Descriptions.Item label="集团号码">{lgbFamilyData.groupNumber}</Descriptions.Item>
          <Descriptions.Item label="邮编">{lgbFamilyData.postCode}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="兼职信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="社会团体">{lgbPartTimeData.socialGroups}</Descriptions.Item>
          <Descriptions.Item label="职务">{lgbPartTimeData.post}</Descriptions.Item>
          <Descriptions.Item label="兼职常驻地">
            {lgbPartTimeData.placeOfResidenceName}
          </Descriptions.Item>
          <Descriptions.Item label="详细地址">{lgbPartTimeData.detailedAddress}</Descriptions.Item>
        </Descriptions>

        <Descriptions title="健康档案" column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="健康状态">
            {enums.dictHealthStatus && enums.dictHealthStatus[lgbDetailData.dictHealth]}
          </Descriptions.Item>
          <Descriptions.Item label="疾病情况">{lgbHealthyData.disease}</Descriptions.Item>
          <Descriptions.Item label="合同医院">{lgbHealthyData.assignedHospital}</Descriptions.Item>
          <Descriptions.Item label="评残情况">{lgbHealthyData.disability}</Descriptions.Item>
          <Descriptions.Item label="就近医院">{lgbHealthyData.nearHospital}</Descriptions.Item>
          <Descriptions.Item label="医疗照顾">
            {lgbHealthyData.caregivers === 1 ? '是' : '否'}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ vcBasicInfo, loading, global }) => ({
  vcBasicInfo,
  loading: loading.models.vcBasicInfo,
  enums: global.enums,
}))(DetailModal);
