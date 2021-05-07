import React from 'react';
import Button from '../Button/Button';

function Prompt(props) {
    const { user, onAbortClick, onDeleteUser, type } = props;

    return (
        <div className="container max-width">
            {type === 'delete' &&
                <>
                    <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
                    <p className="low-emphasis-text">This action can not be undone!</p>

                    <div className="buttons-side-by-side">
                        <Button onClick={onAbortClick} label="Cancel" size="half" variant="secondary-outlined" />
                        <Button onClick={onDeleteUser} label="Confirm Delete" size="half" variant="danger" />
                    </div>
                </>
            }
        </div>
    );
}

export default Prompt;