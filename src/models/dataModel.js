// import { message } from 'antd';
// import {
//   getInfo,
//   getLists,
//   getWrongs,
//   getAnalysts,
//   createLists,
//   completeLists,
  
// } from '../services/caculate/api';
// export default {
//   namespace: 'dataModel',
//   state: {

//   },
//   reducers: {
//     save(state, { payload }) {
//       console.log('save');
//       console.log('payloads', payload);
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },
//   effects: {
//     // *fetch({ payload }, { call, put }) {
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       loading:true,
//     //     },
//     //   });
//     //   console.log('fetch');
//     //   console.log('payload', payload);
//     //   const response = yield call(getDictList, payload);
//     //   // setTimeout(hide, 100);
//     //   const {
//     //     data: {
//     //       data: { records, total },
//     //     },
//     //   } = response;
//     //   // console.log('response', response);
//     //   const list = records;
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       data: list,
//     //       pagination: {
//     //         current: payload.current,
//     //         size: payload.size,
//     //         total: total,
//     //       },
//     //       loading:false,
//     //     },
//     //   });
//     // },
//     // *edit({ payload }, { call, put }) {
//     //   // const response = yield call(DataDictionaryService.edit, payload.data);
//     //   const hide = message.loading('数据上传中..', 0);
//     //   const response = yield call(editDict, payload.data);
//     //   setTimeout(hide, 100);
//     //   console.log('edit', response);
//     //   if (response.data.code === 0) {
//     //     message.success('数据更新成功');
//     //   }
//     //   yield put({
//     //     type: 'fetch',
//     //     payload: {
//     //       ...payload.pagination,
//     //     },
//     //   });
//     // },


//     // *getDict({ payload }, { call, put }) {
//     //   const hide = message.loading('数据请求中..', 0);
//     //   const response = yield call(getDictdetail, payload);
//     //   setTimeout(hide, 100);
//     //   const {
//     //     data: { data },
//     //   } = response;
//     //   // console.log(response);
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       editDicData: { ...data },
//     //       getDataloading:false,
//     //     },
//     //   });

//     // },
//     // *del({ payload }, { call, put }) {
//     //   console.log('del');
//     //   const response = yield call(deleteDict, payload.data);
//     //   if (response.data.code === 0) {
//     //     message.success('数据删除成功');
//     //   }
//     //   yield put({
//     //     type: 'fetch',
//     //     payload: {
//     //       ...payload.pagination,
//     //     },
//     //   });
//     // },
//     // *add({ payload }, { call, put, select }) {
//     //   // const response = yield call(DataDictionaryService.add, payload.data);
//     //   const response = yield call(addDict, payload.data);
//     //   if (response.data.code === 0) {
//     //     message.success('数据新增成功');
//     //     // console.log('success');
//     //   }
//     //   const pagination = yield select(state => state.DictDataModel.pagination);
//     //   console.log(pagination);
//     //   yield put({
//     //     type: 'fetch',
//     //     payload: {
//     //       ...pagination,
//     //     },
//     //   });
//     // },
//     // *fetchItem({ payload }, { call, put, select }) {
//     //   const id = yield select(state => state.DictDataModel.dictId);
//     //   const result = {
//     //     ...payload.data,
//     //     ...payload.pagination,
//     //   };
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       loading:true,
//     //     },
//     //   });
//     //   const response = yield call(getItemList, result);
//     //   const {
//     //     data: {
//     //       data: { records, total },
//     //     },
//     //   } = response;
//     //   // console.log('response', response);
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       itemData: records,
//     //       pagination: {
//     //         ...payload.pagination,
//     //         total: total,
//     //       },
//     //       loading:false,
//     //     },
//     //   });
//     // },
//     // *addItem({ payload }, { call, put,select }) {
//     //   const response = yield call(addDictItem, payload.data);

//     //   if (response.data.code === 0) {
//     //     message.success('数据新增成功');
//     //     // console.log('p',payload);
//     //   }
//     //   const id=yield select(state=>state.DictDataModel.dictId);
//     //   yield put({
//     //     type: 'fetchItem',
//     //     payload: {
//     //       data:{
//     //         dictId:id,
//     //       },
//     //       pagination:{...payload.pagination},
//     //     }
//     //   });
//     // },
//     // *getItem({ payload }, { call, put }) {
//     //   const hide = message.loading('数据请求中..', 0);
//     //   const response = yield call(getDictItemdetail, payload);
//     //   setTimeout(hide, 100);
//     //   const {
//     //     data: { data },
//     //   } = response;
//     //   // console.log(response);
//     //   yield put({
//     //     type: 'save',
//     //     payload: {
//     //       editItemData: { ...data },
//     //       getDataloading:false,
//     //     },
//     //   });
//     // },
//     // *editItem({ payload }, { call, put,select }) {
//     //   // const response = yield call(DataDictionaryService.edit, payload.data);
//     //   const response = yield call(editDictItem, payload.data);
//     //   // console.log('editresponse', response);
//     //   if (response.data.code === 0) {
//     //     message.success('数据更新成功');
//     //   }
//     //   const id=yield select(state=>state.DictDataModel.dictId);
//     //   yield put({
//     //     type: 'fetchItem',
//     //     payload: {
//     //       data:{
//     //         dictId:id,
//     //       },
//     //       pagination:{...payload.pagination},
//     //     },
//     //   });
//     // },
    
//   },
  
// };
