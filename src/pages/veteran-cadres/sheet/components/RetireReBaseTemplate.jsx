import React from 'react';
import styles from '../style.less';

const RetireReBaseTemplate = ({ sheetData, id, title, organizationName }) => (
  <table border="1" cellSpacing="0" cellPadding="4px" id={id}>
    <tbody>
      <tr>
        <td colSpan="17" style={{ fontSize: '20px', fontWeight: '700' }}>
          {title}
        </td>
      </tr>
      <tr>
        <td colSpan="17" style={{ textAlign: 'left', paddingLeft: 20 }}>
          填报单位：{organizationName}
        </td>
      </tr>
      <tr>
        <td rowSpan="5">项 目</td>
        <td rowSpan="5" className={styles.number}>
          编<br />
          <br />号
        </td>
        <td rowSpan="5" className={styles.total}>
          总<br />
          <br />数
        </td>
        <td colSpan="4" rowSpan="2" />
        <td colSpan="10" rowSpan="2" style={{ height: '48px' }}>
          {' '}
          &nbsp;&nbsp;&nbsp;参&nbsp;&nbsp;&nbsp;加&nbsp;&nbsp;&nbsp;革&nbsp;&nbsp;&nbsp;命&nbsp;&nbsp;&nbsp;工&nbsp;&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;时&nbsp;&nbsp;&nbsp;间&nbsp;&nbsp;&nbsp;{' '}
        </td>
      </tr>
      <tr />
      <tr>
        <td rowSpan="3" className={styles.sum}>
          中共
          <br />
          党员
        </td>
        <td rowSpan="3" className={styles.sum}>
          生活不
          <br />
          能自理
        </td>
        <td rowSpan="3" className={styles.sum}>
          70岁至
          <br />
          79 岁
        </td>
        <td rowSpan="3" className={styles.sum}>
          80岁
          <br />
          及以上
        </td>
        <td className={styles.time} rowSpan="2" colSpan="2" style={{ borderBottomStyle: 'none' }}>
          1927年7月1日
        </td>
        <td className={styles.time} rowSpan="2" colSpan="2" style={{ borderBottomStyle: 'none' }}>
          1927年8月1日至1937年
        </td>
        <td className={styles.time} rowSpan="2" colSpan="2" style={{ borderBottomStyle: 'none' }}>
          1937年7月7日至1942年
        </td>
        <td className={styles.time} rowSpan="2" colSpan="2" style={{ borderBottomStyle: 'none' }}>
          1943年1月1日至1945年
        </td>
        <td className={styles.time} rowSpan="2" colSpan="2" style={{ borderBottomStyle: 'none' }}>
          1945年9月3日至1949年
        </td>
      </tr>
      <tr />
      <tr>
        <td className={styles.time} style={{ borderTopStyle: 'none' }}>
          底 以 前
        </td>
        <td className={styles.injing}>在京</td>
        <td className={styles.time} style={{ borderTopStyle: 'none' }}>
          7月6号
        </td>
        <td className={styles.injing}>在京</td>
        <td className={styles.time} style={{ borderTopStyle: 'none' }}>
          12月底
        </td>
        <td className={styles.injing}>在京</td>
        <td className={styles.time} style={{ borderTopStyle: 'none' }}>
          9月2号
        </td>
        <td className={styles.injing}>在京</td>
        <td className={styles.time} style={{ borderTopStyle: 'none' }}>
          9月30号
        </td>
        <td className={styles.injing}>在京</td>
      </tr>

      {sheetData[id] &&
        sheetData[id].map((item, index) => (
          <tr key={index}>
            <td>{item.remarks}</td>
            <td className={styles.number}>{index + 1}</td>
            <td>{item.termEnd}</td>
            <td>{item.partyMember}</td>
            <td>{item.lifeCannotTake}</td>
            <td>{item.seventyNine}</td>
            <td>{item.eighty}</td>
            <td>{item.revolutionPeriod1}</td>
            <td>{item.revolutionPeriod1AtBeij}</td>
            <td>{item.revolutionPeriod2}</td>
            <td>{item.revolutionPeriod2AtBeij}</td>
            <td>{item.revolutionPeriod3}</td>
            <td>{item.revolutionPeriod3AtBeij}</td>
            <td>{item.revolutionPeriod4}</td>
            <td>{item.revolutionPeriod4AtBeij}</td>
            <td>{item.revolutionPeriod5}</td>
            <td>{item.revolutionPeriod5AtBeij}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default RetireReBaseTemplate;
