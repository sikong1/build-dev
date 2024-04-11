import { defineStore } from "pinia";

const useFile = defineStore({
    id: "file",
    state: () => ({
        fileData: {
            fileHash: '',
            fileName: '',
            size: '',
            chunkHashArr: []
        },
        progress: 0
    }),
    actions: {
        setFileHash(val) {
            this.fileData = val
        },

        setProgress(progress) {
            this.progress = progress;
        },

        clearFileHash() {
            this.fileData = {
                fileHash: '',
                fileName: '',
                size: '',
                chunkHashArr: []
            }
        },
    }
});

export default useFile;
