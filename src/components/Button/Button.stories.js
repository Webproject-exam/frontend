// Button.stories.js
import React from 'react';
import Button from './Button';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
    title: 'Components/Button',
    component: Button,
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
const Template = args => <Button {...args} />

//👇 Each story then reuses that template
export const Primary = Template.bind({})
export const Secondary = Template.bind({})
export const SecondaryOutlined = Template.bind({})
export const Danger = Template.bind({})
export const DangerOutlined = Template.bind({})
export const Disabled = Template.bind({})

Primary.args = {}

Secondary.args = {
    variant: "secondary",
    label: "secondary button"
}

SecondaryOutlined.args = {
    variant: "secondary-outlined",
    label: "secondary outlined button"
}

Danger.args = {
    variant: "danger",
    label: "dangerous button"
}

DangerOutlined.args = {
    variant: "danger-outlined",
    label: "dangerous outlined button"
}

Disabled.args = {
    disabled: true,
    label: 'disabled button'
}