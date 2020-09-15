import React, { useEffect } from 'react';
import { connect } from 'umi';

const Home = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  return <div>Home</div>;
};

export default connect(() => ({}))(Home);
