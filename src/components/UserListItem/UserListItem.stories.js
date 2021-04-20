// UserListItem.stories.js
import React from 'react';
import '../../colors.css'
import '../../index.css'
import UserListItem from './UserListItem';



//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/UserListItem',
    component: UserListItem,
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
const Template = args => <UserListItem {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})
export const PopulatedGardener = Template.bind({})
export const PopulatedManager = Template.bind({})


Default.args = {
    user: {
        email: 'N/A',
        name: 'N/A',
        role: 'gardener',
        surname: ''
    },
}

PopulatedGardener.args = {
    user: {
        email: 'johnsmith@example.com',
        name: 'John',
        role: 'gardener',
        surname: 'Smith'
    },
}

PopulatedManager.args = {
    user: {
        email: 'jimmysmith@example.com',
        name: 'Jimmy',
        role: 'manager',
        surname: 'Smith'
    },
}