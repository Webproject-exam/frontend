// Button.stories.js
import React from 'react';
import ForgotPasswordEmailForm from './ForgotPasswordEmailForm';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/ForgotPasswordEmailForm',
    component: ForgotPasswordEmailForm,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <ForgotPasswordEmailForm {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})

Default.args = {}