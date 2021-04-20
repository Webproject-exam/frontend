// StatusCard.stories.js
import React from 'react';
import StatusCard from './StatusCard';
import '../../colors.css'
import '../../index.css'
import { BrowserRouter as Router } from 'react-router-dom';

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/StatusCard',
    component: StatusCard,
    parameters: {
        controls: {
            sort: 'alpha'
        }
    }, decorators: [story =>
        <Router>
            {story()}
        </Router>],

    //👇 We can specify which controls get used by declaring a custom argType
    argTypes: {

    }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <StatusCard {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})
export const NotFound = Template.bind({})
export const Forbidden = Template.bind({})

Default.args = {
    
}

NotFound.args = {
    statusCode: 404,
    statusText: "Page Not Found"
}

Forbidden.args = {
    statusCode: 403,
    statusText: "Forbidden"
}