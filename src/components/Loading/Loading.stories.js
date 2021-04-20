// Loading.stories.js
import React from 'react';
import Loading from './Loading';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/Loading',
    component: Loading,
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
const Template = args => <Loading {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})

Default.args = {}