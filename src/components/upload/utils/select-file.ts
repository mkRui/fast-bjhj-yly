/*
 * @Author: mkRui
 * @Date: 2021-10-16 15:23:55
 * @LastEditTime: 2021-10-16 16:07:23
 */
type FileInputUploadedCallBack = (fileList?: FileList) => void;

export interface SelectFileOptions {
    accept?: string;
}

export class SelectFile {
    private options: SelectFileOptions;
    private fileInput: HTMLInputElement | null = null;
    private fileInputUploaded: FileInputUploadedCallBack | null = null;
    public constructor(options: SelectFileOptions = {}) {
        this.options = options;
    }
    /**
     * 获取输入框选择的文件
     */
    public async getImage(): Promise<FileList | undefined> {
        return new Promise((resolve) => {
            const fileInput = this.fileInput;
            // 删除上次input标签，用户打开文件选择框，没有选择文件就会需要释放
            this.destroySelectFile();

            this.fileInputUploaded = resolve;
            this.fileInput = fileInput || document.createElement('input');
            if (!fileInput) {
                this.fileInput.setAttribute('type', 'file');
                if (this.options.accept) {
                    this.fileInput.setAttribute('accept', this.options.accept);
                }
                this.fileInput.style.display = 'none';
                document.body.appendChild(this.fileInput);
            } else {
                this.fileInput.value = '';
            }
            const removeChild = () => {
                if (this.fileInput) {
                    document.body.removeChild(this.fileInput);
                }
                this.fileInput = null;
            };
            const onchange = async () => {
                const { fileInput } = this;
                if (!fileInput || !fileInput.files || !this.fileInputUploaded) {
                    removeChild();
                    resolve(undefined);
                    return;
                }
                const files = fileInput.files;
                this.fileInputUploaded(files);
                // 删除本次input标签
                this.destroySelectFile();
                removeChild();
                resolve(files);
            };
            // 监听文件改变事件
            this.fileInput.onchange = onchange;
            // 打开文件选择框
            this.fileInput.click();
        });
    }
    /**
     * 销毁实例
     */
    public destroy() {
        this.destroySelectFile();
    }

    /**
     * 销毁图片上传的回调，避免Promise永远没有执行回调，导致的内存泄漏
     */
    private destroySelectFile() {
        // 执行对应的Promise回调
        if (this.fileInputUploaded) {
            this.fileInputUploaded();
            this.fileInputUploaded = null;
        }
        if (this.fileInput) {
            // 移除事件绑定
            this.fileInput.onchange = null;
            this.fileInput = null;
        }
    }
}
