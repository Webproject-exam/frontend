import './my-profile.css';
import Button from '../Button/Button';
import Header from '../Header/Header'

function MyProfile({ selectedUser, handleEditClick }) {
    return (
        <>
            <Header heading="Your Profile"/>
            <div className="container your-profile">
                <h2> {selectedUser.name} {selectedUser.surname}</h2>
                <h3>Role: {selectedUser.role}</h3>
                <p><b>Email:</b> {selectedUser.email}</p>
                <Button onClick={handleEditClick} label="edit profile" variant="secondary" />
            </div>
        </>
    );
}

export default MyProfile;