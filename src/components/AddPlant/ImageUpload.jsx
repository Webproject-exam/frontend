import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import DeleteFile from './DeleteFile';
import UploadFile from './UploadFile';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: []
        };
    }

    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        // FLYTT DENNE INN I API SENERE!!
        /* fetch(`${API_URL}/image-upload`, {
            method: 'POST',
            body: formData
        })
        .then(res = res.json())
        .then(images => {
            this.setState({
                uploading: false,
                images
            })
        }) */
        // NED HIT
    };

    removeImage = id => {
        this.setState({
            images: this.state.images.filter(image => image.public_id !== id)
        });
    };

    render() { 
        const { uploading, images } = this.state;

        const content = () => {
            switch(true) {
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