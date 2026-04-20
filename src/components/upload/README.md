<!--
 * @Author: mkRui
 * @Date: 2021-11-02 21:19:15
 * @LastEditTime: 2021-11-15 01:02:46
-->
用法
```javascript
import Upload from 'ye-home/src/components/upload';


// action 表示使用那个接口上传文件
<Upload action="/admin/common/uploadFile" />
<Upload action="/admin/common/uploadUserAvatar" />

// 额外参数
<Upload
    action="/admin/operate/contractAgreementFileUpload"
    data={{
        agreementId: record.id
    }}
>
    <Button type="primary">上传纸质合同</Button>
</Upload>

// 配合form使用
<Item name="logo" validateTrigger="onBlur" label="租户图标">
    <Upload action="/admin/common/uploadUserAvatar" />
</Item>

// 参数列表
value 上传后的URL地址
onChange 修改提交上传的所触发的函数

```