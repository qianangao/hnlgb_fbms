import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import styles from '../style.less';

const RetireTotalTwoYears = ({ sheetData, organizationName, sheetLoading, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'vcAnalysisSheet/getRetireTotalYearsData',
    });
  }, []);

  return (
    <GridContent>
      <Spin spinning={sheetLoading}>
        <table border="1" cellSpacing="0" cellPadding="4px" id="RetireTotalTwoYears">
          <tbody>
            <tr>
              <td colSpan="18" style={{ fontSize: '20px', fontWeight: 700 }}>
                退休干部两年数字变化情况统计表
              </td>
            </tr>
            <tr>
              <td colSpan="18" style={{ textAlign: 'left', paddingLeft: 20 }}>
                填报单位：{organizationName}
              </td>
            </tr>
            <tr>
              <td rowSpan="5" colSpan="2">
                项 目
              </td>
              <td rowSpan="5" className={styles.number}>
                编<br />
                <br />号
              </td>
              <td rowSpan="5" className={styles.total}>
                上年未
                <br />
                总数
              </td>
              <td colSpan="10" rowSpan="2" style={{ height: '48px' }}>
                本年度内办理退休手续干部数
              </td>
              <td rowSpan="5" className={styles.total}>
                本年度内去世退休干部数
              </td>
              <td rowSpan="5" className={styles.total}>
                本年12月底应有退休干部数
              </td>
              <td rowSpan="5" className={styles.total}>
                本年12月底实有退休干部数
              </td>
              <td rowSpan="5" className={styles.total}>
                实有数与应有数之差
              </td>
            </tr>
            <tr />
            <tr>
              <td rowSpan="3" className={styles.total} style={{ height: '72px' }}>
                合计
              </td>
              <td rowSpan="3" className={styles.sum}>
                正省
                <br />
                部级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副省
                <br />
                部级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正厅
                <br />
                局级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副厅
                <br />
                局级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正县
                <br />
                处级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副县
                <br />
                处级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正乡
                <br />
                科级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副乡
                <br />
                科级
              </td>
              <td rowSpan="3" className={styles.total}>
                科员、办事员及其他
              </td>
            </tr>
            <tr />
            <tr />
            {sheetData.retireTotalYearsData &&
              sheetData.retireTotalYearsData.map((item, index) => (
                <tr key={`retireTotalYearsData${index}`}>
                  {index === 1 ? (
                    <td
                      rowSpan={sheetData.retireTotalYearsData.length - index - 2}
                      style={{ width: '30px' }}
                    >
                      机<br />
                      <br />关
                    </td>
                  ) : null}
                  {index === 0 ||
                  index === sheetData.retireTotalYearsData.length - 1 ||
                  index === sheetData.retireTotalYearsData.length - 2 ? (
                    <td colSpan="2">{item.remark}</td>
                  ) : (
                    <td>{item.remark}</td>
                  )}
                  <td className={styles.number}>{index + 1}</td>
                  <td>{item.lastTotal}</td>
                  <td>{item.termEnd}</td>
                  <td>{item.provMinisterial}</td>
                  <td>{item.viceProvMinisterial}</td>
                  <td>{item.departBureau}</td>
                  <td>{item.viceDepartBureau}</td>
                  <td>{item.countySection}</td>
                  <td>{item.viceCountySection}</td>
                  <td>{item.ruralChief}</td>
                  <td>{item.viceRuralChief}</td>
                  <td>{item.staffClerkOther}</td>
                  <td>{item.dieNums}</td>
                  <td>{item.shouldRetire}</td>
                  <td>{item.actualRetire}</td>
                  <td>{item.differences}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Spin>
    </GridContent>
  );
};

export default connect(({ user, vcAnalysisSheet, loading }) => ({
  organizationName: user.userInfo.organizationName,
  sheetData: vcAnalysisSheet.sheetData,
  sheetLoading: loading.effects['vcAnalysisSheet/getRetireTotalYearsData'],
}))(RetireTotalTwoYears);
