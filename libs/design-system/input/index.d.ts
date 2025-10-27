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
declare const InputWithClearButton: Story;
declare const RequiredInputWithClearButton: Story;

export { FloatingFill, FloatingOutlined, InputWithClearButton, NonFloatingFill, NonFloatingOutlined, RequiredInputWithClearButton, RequiredInputWithValidation };
