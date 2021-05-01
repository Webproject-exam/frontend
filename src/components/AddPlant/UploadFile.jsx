import React from 'react';
import Upload from '../../assets/file_upload_black_24dp.svg';

const UploadFile = props => {
    return (
    <div className='buttons fadein'>
        <div className='button'>
            <label htmlFor='single'>
                <img src={Upload} alt="File Upload"  />
            </label>
            <input type='file' id='single' onChange={props.onChange} />
        </div>
    </div>
    );
}

export default UploadFile;