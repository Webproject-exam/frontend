// UpdateUser.stories.js
import React from 'react';
import UpdateUser from './UpdateUser';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/UpdateUser',
    component: UpdateUser,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {
        
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <UpdateUser {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})
export const OnProfile = Template.bind({})
export const OnDashboard = Template.bind({})

Default.args = {
    selectedUser: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    },
    place: 'none'
}

OnProfile.args = {
    selectedUser: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    },
    place: 'profile'
}

OnDashboard.args = {
    selectedUser: {
        email: 'johnsmith@example.com',
        name: 'Johnny',
        role: 'gardener',
        surname: 'Smith'
    },
    place: 'dashboard'
}
