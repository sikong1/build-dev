import useStore from "@/pinia";
import { postBreakpointContinuationFile, postMergeFile } from "@/server/modules/file";
import { ElMessage } from "element-plus";
import { ref } from "vue";

// 切片上传
const useFileSizeUpload = () => {

    const { fileStore } = useStore()

    // 开始上传   uploadSize: 单位: KB
    const fileUpload = async (file, uploadSize, callback) => {
        reuseCount.value = 0
        const chunkSize = uploadSize * 1024;
        const size = file.size;
        const fileName = file.name;
        const fileHash = await generateFileHash(file)
        const list = getFileList(file, chunkSize)

        fileStore.setFileHash({
            fileHash,
            fileName,
            size,
            chunkHashArr: list,
        });
        await chunkFormData(list, callback)
    }

    // 分片上传
    const chunkFormData = async (list, callback) => {
        const length = list.length;
        list.forEach(async (item, index) => {
            const formData = new FormData();
            formData.append('file', item);
            const chunkHash = await generateFileHash(item)
            formData.append('fileHash', fileStore.fileData.fileHash);
            formData.append('chunkHash', chunkHash);

            console.log(((index + 1) / length).toFixed(0), '((index + 1) / length).toFixed(0)');
            try {
                callback && callback(formData, length)
            } catch (error) {
                console.error('上传失败:', error);
                return;
            }
        })
    }

    // 获取文件切片
    const getFileList = (file, chunkSize) => {
        let start = 0;
        const list = []
        while (start < file.size) {
            const currentSize = start + chunkSize
            const chunk = file.slice(start, currentSize);
            list.push(chunk)
            start += chunkSize;
        }
        return list;
    }

    // 生成文件hash
    const generateFileHash = (file) => {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = () => {
                const arrayBuffer = fileReader.result;
                const hashBuffer = crypto.subtle.digest('SHA-256', arrayBuffer);
                hashBuffer.then(hash => {
                    const hashArray = Array.from(new Uint8Array(hash));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    resolve(hashHex);
                });
            };
        });
    }

    let indexArr = []
    const reuseCount = ref(0)
    // 上传文件
    const postFile = async (formData, length) => {
        const res = await postBreakpointContinuationFile(formData);

        if (res.data.status === 200403)  reuseCount.value += 1
        if (res.data.status === 201) return ElMessage.error(res.data.msg);

        indexArr.push(0)
        const i = indexArr.length;
        fileStore.setProgress((i / length * 100).toFixed(0) );
        console.log("res", length, i);
        if (indexArr.length === length) {
            reuseCount.value && ElMessage.success("已复用" + reuseCount.value + "个分片");
            mergeFile()
        }
    };

    // 合并文件
    const mergeFile = async () => {
        indexArr = [];
        const { fileHash, fileName, size } = fileStore.fileData;
        const data = await postMergeFile({
            fileHash,
            fileName,
            size,
        }).catch(() => { });

        if (data.data.status === 201) return ElMessage.info(data.data.msg);
        if (data.data.status === 200403)  ElMessage.info(data.data.msg);

        fileStore.clearFileHash();
        fileStore.setProgress(0);
    };

    return {
        fileUpload,
        chunkFormData,
        postFile,
        reuseCount
    }
};

export default useFileSizeUpload;
