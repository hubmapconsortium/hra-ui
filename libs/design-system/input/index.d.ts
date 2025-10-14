import { StoryObj } from '@storybook/angular';

interface ExtraArgs {
    disabled?: boolean;
}
type Story = StoryObj<ExtraArgs>;
declare const FloatingFill: Story;
declare const FloatingOutlined: Story;
declare const NonFloatingFill: Story;
declare const NonFloatingOutlined: Story;
declare const RequiredInputWithValidation: Story;

export { FloatingFill, FloatingOutlined, NonFloatingFill, NonFloatingOutlined, RequiredInputWithValidation };
