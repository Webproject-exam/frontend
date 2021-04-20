// NavBar.stories.js
import React from 'react';
import NavBar from './NavBar';
import '../../colors.css'
import '../../index.css'
import { BrowserRouter as Router } from 'react-router-dom';

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/NavBar',
    component: NavBar,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    },
    decorators: [story =>
        
            <Router>
                <div style={{ height: '130px' }}>
                    {story()}
                </div>
            </Router>
        ],

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {
        handleLogOut: { action: 'clicked' }
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <NavBar {...args} />

//👇 Each story then reuses that template
export const LoggedOut = Template.bind({})
export const LoggedInAsManager = Template.bind({})
export const LoggedInAsGardener = Template.bind({})


LoggedOut.args = {
    auth: false
}

LoggedInAsManager.args = {
    auth: true,
    role: 'manager'
}

LoggedInAsGardener.args = {
    auth: true,
    role: 'gardener'
}