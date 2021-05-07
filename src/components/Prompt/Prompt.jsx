import React from 'react';
import Button from '../Button/Button';

function Prompt(props) {
    const { onCancelClick, onConfirmClick, plant, type, user } = props;

    let buttonVariant;
    let buttonLabel;

    if (type === 'delete'){
        buttonVariant = 'danger';
        buttonLabel = 'confirm deletion';
    } else {
        buttonVariant = 'secondary';
        buttonLabel = 'confirm';
    }

return (
    <div className="container">
        <>
            {user &&
                <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
            }

            {plant &&
                <p>Are you sure you want to water the plant <span className="bold">{plant.name}</span>?</p>
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