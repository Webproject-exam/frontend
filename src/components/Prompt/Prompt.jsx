import React from 'react';
import Button from '../Button/Button';

function Prompt(props) {
    const { onCancelClick, onConfirmClick, plant, type, user } = props;

    let buttonVariant;
    let buttonLabel;
    let action;

    if (type === 'delete') {
        action = 'delete';
        buttonVariant = 'danger';
        buttonLabel = 'delete';
    } else {
        action = 'water';
        buttonVariant = 'secondary';
        buttonLabel = 'confirm';
    }

    return (
        <div className="container">
            <>
                {user &&
                <>
                    <h1>Delete a user</h1>
                    <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
                </>
                }

                {plant &&
                <>
                    <h1>{action === 'delete' ? 'Delete' : 'Water'} a plant</h1>
                    <p>Are you sure you want to {action} the plant <span className="bold">{plant.name}</span>?</p>
                </>
                }

                <p className="low-emphasis-text">This action can not be undone!</p>

                <div className="buttons-side-by-side">
                    <Button onClick={onCancelClick} label="Cancel" size="half" variant="secondary-outlined" />
                    <Button onClick={onConfirmClick} label={buttonLabel} size="half" variant={buttonVariant} />
                </div>
            </>
        </div>
    );
}

export default Prompt;