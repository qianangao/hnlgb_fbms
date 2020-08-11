import { message } from 'antd';
import { uploadFile, getDownloadFiles, deleteDownloadFiles } from '@/services/global';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    filesStatus: 1, // 导出中：0， 导出完成： 1
    downloadFiles: [],
  },
  effects: {
    *uploadFile({ payload }, { call }) {
      const { file } = payload;
      const { type } = payload;

      if (type === 'image' && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
        message.warning('仅支持上传图片，请重新上传！（图片类型：gif,jpeg,jpg,png）');
        return;
      }

      if (type === 'excel' && !/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
        message.warning('仅支持上传excel文档，请重新上传！（文件类型：xlsx,xls）');
        return;
      }

      const formData = new FormData();
      formData.append('file', payload.file);

      const response = yield call(uploadFile, formData);

      if (!response || !response.error) {
        return;
      }

      message.warning('上传文件失败，请重试！');
    },
    *refreshDownloadFiles(_, { call, put }) {
      const response = yield call(getDownloadFiles);

      if (response || !response.error) {
        yield put({
          type: 'save',
          payload: {
            filesStatus: response.status,
            downloadFiles: response.downloadCenterDetailVos,
          },
        });
      } else {
        message.warning('获取下载文件列表失败！');
      }
    },
    *deleteDownloadFiles({ payload }, { call, put }) {
      const response = yield call(deleteDownloadFiles, payload);

      if (!response || !response.error) {
        yield put({
          type: 'deleteDownLoadFiles',
          payload,
        });
        yield put({
          type: 'refreshDownloadFiles',
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    deleteDownLoadFiles(state, { payload }) {
      const ids = payload.ids || [];
      const downloadFiles = state.downloadFiles.filter(file => ids.indexOf(file.id) === -1);
      return { ...state, downloadFiles };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
  subscriptions: {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    setup({ history }) {
      // 浏览器历史日志相关逻辑
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      // history.listen(({ pathname, search }) => {
      //   if (typeof window.ga !== 'undefined') {
      //     window.ga('send', 'pageview', pathname + search);
      //   }
      // });
    },
  },
};
export default GlobalModel;
