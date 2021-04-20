// MyProfile.stories.js
import React from 'react';
import MyProfile from './MyProfile';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/MyProfile',
    component: MyProfile,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {
        handleEditClick: { action: 'clicked' }
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <MyProfile {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})
export const Populated = Template.bind({})

Default.args = {}

Populated.args = {
    selectedUser:{
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'manager',
        surname: 'Smith'
    }
}