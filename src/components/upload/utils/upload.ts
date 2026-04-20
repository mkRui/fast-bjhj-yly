// import { SelectFile, SelectFileOptions } from './select-file';
// import { BaseRequest } from 'mor-request';
// import axios from 'ye-home/src/api';
// export enum UploadWarning {
//     SizeError = 1,
//     TypeError = 2,
//     FileRegError = 3,
//     RequestError = 4
// }

// interface UploadMediaOption {
//     api?: string;
//     file?: File;
// }

// interface UploadImageOption extends UploadMediaOption {
//     limitSize?: number;
//     isPrivate?: boolean;
//     isHideLoading?: boolean;
//     isHideFailToast?: boolean;
//     isNeedToValidate?: boolean;
//     beforeUpload?: (File) => Promise<File>;
// }

// interface ValidateOption {
//     limitSize?: number;
//     isPrivate?: boolean;
//     fileReg?: RegExp;
// }

// interface UploadFileOptions extends UploadMediaOption, ValidateOption {
//     accept?: string;
// }

// export type UploadRes = SuccessUpload | FailUpload | CloseUpload;

// interface SuccessUpload {
//     type: 'success';
//     data: {
//         url: string;
//     };
// }

// interface FailUpload {
//     type: 'fail';
//     data: UploadWarning;
// }

// interface CloseUpload {
//     type: 'close';
// }

// interface UploadImageData {
//     url: string;
// }

// interface RequestDoneOptions {
//     file: File;
//     isHideFailToast?: boolean;
// }

// const name = Symbol('vueSelectFile');

// /**
//  * 在Vue 中选择文件
//  */
// export const vueSelectFile = (vm: Vue, options: SelectFileOptions) => {
//     let selectFile: SelectFile = vm[name];

//     if (!vm[name]) {
//         selectFile = vm[name] = new SelectFile(options);
//         vm.$once('hook:beforeDestroy', selectFile.destroy.bind(selectFile));
//     }
//     return selectFile.getImage();
// };

// export const uploadCore = (vm: Vue) => {
//     return {
//         /*
//          *  选择文件
//          * */
//         selectFile: async (
//             options: UploadFileOptions
//         ): Promise<File | undefined> => {
//             const files = await vueSelectFile(vm, {
//                 accept:
//                     options.accept ||
//                     'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
//             });
//             if (!Array.isArray(files)) return;
//             return files[0];
//         },
//         /*
//          * 验证，可通过正则传参判断是否匹配
//          * */
//         validate: (
//             file: File,
//             options: ValidateOption
//         ): FailUpload | boolean => {
//             const { limitSize, fileReg } = options;
//             // 自定义正则
//             if (fileReg && fileReg.test(file.name)) {
//                 return { type: 'fail', data: UploadWarning.FileRegError };
//             }
//             if (!/\.(jpg|jpeg|png|GIF|JPG|JEPG|PNG)$/.test(file.name)) {
//                 return { type: 'fail', data: UploadWarning.TypeError };
//             }
//             if (limitSize && limitSize * 1024 * 1000 > file.size) {
//                 return { type: 'fail', data: UploadWarning.SizeError };
//             }
//             return true;
//         },
//         /*
//          *   创建表单
//          * */
//         createFileForm: (file: File, isPrivate?: boolean): FormData => {
//             const formData = new FormData();
//             formData.append('file', file);
//             //  是否私人图片，私人图片：证件... ，非私人图片：头像
//             formData.append('isPrivate', String(isPrivate || false));
//             // 从前端官网上传 暂定system：www
//             formData.append('system', 'offical');
//             formData.append('watermark', 'true');
//             return formData;
//         },
//         /*
//          *   请求完成
//          * */
//         requestDone: (
//             res: BaseRequest.Response<UploadImageData>,
//             // file: File,
//             options: RequestDoneOptions
//         ): SuccessUpload | FailUpload => {
//             if (res.code !== 0) {
//                 if (!options.isHideFailToast) console.error(res.msg);
//                 return { type: 'fail', data: UploadWarning.RequestError };
//             }
//             return {
//                 type: 'success',
//                 data: {
//                     url: res.data.url
//                 }
//             };
//         }
//     };
// };

// export const uploadFileProcess = async (
//     vm: Vue,
//     options: UploadImageOption
// ): Promise<UploadRes | undefined> => {
//     const core = uploadCore(vm);

//     let defaultOptions: UploadImageOption = { isNeedToValidate: true };
//     if (options) {
//         defaultOptions = Object.assign(defaultOptions, options);
//     }
//     let file = defaultOptions.file;
//     if (!defaultOptions.file) {
//         file = await core.selectFile(defaultOptions);
//     }
//     if (!file) return;

//     options.beforeUpload && (file = await options.beforeUpload(file));

//     const validateRes = core.validate(file, defaultOptions);
//     if (typeof validateRes === 'object' && validateRes?.type === 'fail')
//         return validateRes;

//     const fileForm = core.createFileForm(file, defaultOptions.isPrivate);

//     function request() {
//         return config.request.post<UploadImageData>(
//             defaultOptions.api || `/admin/common/uploadFile`,
//             fileForm,
//             {
//                 timeout: 30 * 1000
//             }
//         );
//     }

//     if (defaultOptions.isHideLoading) {
//         return core.requestDone(await request(), {
//             file,
//             isHideFailToast: defaultOptions.isHideFailToast
//         });
//     }
//     const res: Types.Response.All<UploadImageData> = await (
//         Loading as any
//     ).show(vm, () => {
//         return request();
//     });

//     return core.requestDone(res, { file });
// };

// /*
//  *  上传图片
//  * */
// export const uploadImage = async (
//     vm: Vue,
//     options: UploadImageOption
// ): Promise<UploadRes | undefined> => {
//     return uploadFileProcess(vm, options);
// };

// /*
//  *  上传头像
//  * */
// export const uploadAvatar = async (
//     vm: Vue,
//     options: UploadImageOption
// ): Promise<UploadRes | undefined> => {
//     return uploadFileProcess(vm, {
//         ...options,
//         api: '/api/v1/pro/filegateway/uploadAvatar'
//     });
// };

export const a = 1;
