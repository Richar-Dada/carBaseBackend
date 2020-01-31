import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd';
import { UploadFile } from 'antd/es/upload/interface'

interface IProp {
    actionUrl: string,
    onChange?: (info: any) => void
}

interface IState {
    loading: boolean,
    imageUrl: string,
    previewImage: string
    previewVisible: boolean,
    fileList: UploadFile[]
}

interface InfoProp {
  file: UploadFile,
  fileList: UploadFile[],
  [propName: string]: any;
}

function getBase64(img: any, callback?: (imageUrl: string) => void) {
  const reader = new FileReader();
  if (callback) {
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class SingleUpload extends Component<IProp, IState> {
  state = {
    loading: false,
    imageUrl: '',
    previewImage: '',
    previewVisible: false,
    fileList: []
  }

  static getDerivedStateFromProps(nextProps: InfoProp, preState: IState) {
    console.log('nextProps', nextProps)
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || []
      }
    }
    return null;
  }

  handleChange = (info: InfoProp) => {
    const { onChange } = this.props
    this.setState({ fileList: info.fileList })

    onChange && onChange(info.fileList)
  };

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { 
      fileList, 
      previewVisible,
      previewImage
    } = this.state;
    const { actionUrl } = this.props
    return (
      <div className="clearfix">
        <Upload
          name="singleUpload"
          listType="picture-card"
          action={actionUrl}
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default SingleUpload