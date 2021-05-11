import React, { Component } from 'react';
import { imageUpload } from '../../api/plants';
import Loading from '../Loading/Loading';
import DeleteFile from './DeleteFile';
import UploadFile from './UploadFile';
import { notifyError, notifySuccess } from '../../helpers/notification';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            uploading: false,
            images: []
        };
    }

    onChange = async (e) => {
        console.log("In on change");
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        const res = await imageUpload(formData);
        
        if(res.error){
            notifyError("Oops, something went wrong... Please try again!");
            this.setState({
                error: res.error,
                uploading: false
            })
        } else {
            notifySuccess("Image uploaded!");
            this.setState({
                images: res.images,
                uploading: false
            });
        }
    };

    removeImage = id => {
        this.setState({
            images: this.state.images.filter(image => image.public_id !== id)
        });
    };

    render() {
        const { uploading, images } = this.state;

        const content = () => {
            switch (true) {
                case uploading:
                    return <Loading />
                case images.length > 0:
                    return <DeleteFile images={images} removeImage={this.removeImage} />
                default:
                    return <UploadFile onChange={this.onChange} />
            }
        }

        return (
            <div>
                <div className='buttons'>
                    {content()}
                </div>
            </div>
        );
    }
}

export default ImageUpload;