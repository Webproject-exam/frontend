// Button.stories.js
import React from 'react';
import UserFeedbackCard from './UserFeedbackCard';
import '../../colors.css'
import '../../index.css'

//The default export metadata controls how Storybook lists your stories and provides information used by addons.
export default {
  title: 'Components/UserFeedbackCard',
  component: UserFeedbackCard,
  parameters: {
      controls: {
          sort: 'alpha'
      }
  },

  //👇 We can specify which controls get used by declaring a custom argType
  argTypes: {
    OnClick: { action: 'clicked' }
  }
}

//👇 We create a “template” of how args map to rendering
const Template = args => <UserFeedbackCard {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})
export const Success = Template.bind({})
export const Error = Template.bind({})

Default.args = {}

Success.args = {
  variant: 'success',
  feedbackText: 'This is a  message about something that went well.'
}

Error.args = {
  variant: 'error',
  feedbackText: 'This is a message about something that did not go as expected.'
}