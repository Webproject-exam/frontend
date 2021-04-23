// LogInForm.stories.js
import React from 'react';
import LogInForm from './LogInForm';
import '../../colors.css'
import '../../index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../helpers/Auth'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/LogInForm',
    component: LogInForm,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },
    decorators: [story =>
        <AuthProvider>
            <Router>
                {story()}
            </Router>
        </AuthProvider>]
}

//👇 We create a “template” of how args map to rendering
const Template = args => <LogInForm {...args} />

//👇 Each story then reuses that template
export const LoggedOut = Template.bind({})