// Button.stories.js
import React from 'react'; 
import Dashboard from './Dashboard';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/Dashboard',
    component: Dashboard,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <Dashboard {...args} />

//👇 Each story then reuses that template
export const Primary = Template.bind({})

Primary.args = {}