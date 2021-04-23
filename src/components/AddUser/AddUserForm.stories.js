// Button.stories.js
import React from 'react'; 
import AddUserForm from './AddUserForm';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/AddUserForm',
    component: AddUserForm,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },
}

//👇 We create a “template” of how args map to rendering
const Template = args => <AddUserForm {...args} />

//👇 Each story then reuses that template
export const Primary = Template.bind({})

Primary.args = {}