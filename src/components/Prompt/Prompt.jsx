import React from 'react';
import Button from '../Button/Button';
import './Prompt.css'

function Prompt(props) {
    const { onCancelClick, onConfirmClick, plant, user, action } = props;

    let buttonVariant;
    let buttonLabel;

    if (action === 'delete') {
        buttonVariant = 'danger';
        buttonLabel = 'delete';
    } else {
        buttonVariant = 'secondary';
        buttonLabel = 'confirm';
    }

    return (
        <div className="container prompt">
            <>
                {user &&
                <>
                    <h1>Delete a user</h1>
                    <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
                </>
                }

                {plant &&
                <>
                    <h1>{action} a plant</h1>
                    <p>Are you sure you want to {action} the plant <span className="bold">{plant.name}</span>?</p>
                </>
                }

                <p className="low-emphasis-text">This action can not be undone!</p>

                <div className="buttons-side-by-side">
                    <Button onClick={onCancelClick} label="cancel" size="half" variant="secondary-outlined" />
                    <Button onClick={onConfirmClick} label={buttonLabel} size="half" variant={buttonVariant} />
                </div>
            </>
        </div>
    );
}

export default Prompt;