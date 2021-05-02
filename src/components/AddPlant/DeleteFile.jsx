import React from 'react';
import Delete from '../../assets/delete_black_24dp.svg';

const DeleteFile = props => {
    return (
        props.images.map((image, i) =>
            <div key={i} className="fadein">
                <div
                    onClick={() => props.removeImage(image.public_id)}
                    className="delete"
                >
                    <img src={Delete} alt="Delete" />
                </div>
                <img src={image.secure_url} alt="" />
            </div>
        ));
}

export default DeleteFile;