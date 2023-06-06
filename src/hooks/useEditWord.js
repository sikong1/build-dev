
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { ref } from 'vue';

/**
 * 生成docx文件
 * @param {string} path 模板路径
 * @param {object} dataConfig 模板数据 
 * @returns {object} downloadLink 下载链接
 * @returns {function} getDocxLink 开始生成docx文件下载链接
 */
const generateDocx = () => {
  const downloadLink = ref('')
  const getDocxLink = async (path, dataConfig) => {
    return new Promise((resovle) => {
      // 加载模板
      let templateData = null;
      fetch(path)
        .then(response => response.arrayBuffer())
        .then(async data => {
          templateData = new Uint8Array(data);
          // 创建docxtemplater实例
          const zip = new PizZip(templateData);
          const doc = new Docxtemplater().loadZip(zip);
          // 设置文档数据
          doc.setData(dataConfig);
          // 渲染文档
          doc.render();
          // 获取渲染后的文档内容
          const blob = doc.getZip().generate({ type: 'blob' });
          // 转换为文件流
          downloadLink.value = blob
          resovle()
        })
        .catch(error => {
          console.log('Error loading template:', error);
        });
    })
  }

  return {
    downloadLink,
    getDocxLink
  }
}

export default generateDocx