# Headless UI

Use the installed `@headlessui/react` package for accessible, unstyled React components. Style them with Tailwind CSS. Read the linked official documentation for component composition, keyboard behavior, and API details before implementing a matching interface.

## Component guide

| Interface | Component and official documentation |
| --- | --- |
| Action menu | [Menu](https://headlessui.com/react/menu) |
| Modal, confirmation, or modal drawer | [Dialog](https://headlessui.com/react/dialog) |
| Floating panel with interactive content | [Popover](https://headlessui.com/react/popover) |
| Collapsible section | [Disclosure](https://headlessui.com/react/disclosure) |
| Tabbed panels | [Tabs](https://headlessui.com/react/tabs) |
| Searchable selection | [Combobox](https://headlessui.com/react/combobox) |
| Custom selection list | [Listbox](https://headlessui.com/react/listbox) |
| Native selection control | [Select](https://headlessui.com/react/select) |
| Mutually exclusive choices | [Radio Group](https://headlessui.com/react/radio-group) |
| Checked or mixed state | [Checkbox](https://headlessui.com/react/checkbox) |
| On/off toggle | [Switch](https://headlessui.com/react/switch) |
| Text entry | [Input](https://headlessui.com/react/input), [Textarea](https://headlessui.com/react/textarea) |
| Form grouping and labels | [Fieldset](https://headlessui.com/react/fieldset) |
| Button states | [Button](https://headlessui.com/react/button) |
| Enter/leave animation | [Transition](https://headlessui.com/react/transition) |

## Implementation

- Import named components from `@headlessui/react` and follow each page's component structure.
- Use `Menu` for actions, `Listbox` for choosing values, and `Combobox` for searchable choices.
- Provide accessible labels and visible focus states. Style supported states through documented `data-*` attributes or render props.
- For dialogs, supply `open`, `onClose`, and a `DialogTitle`. Let Headless UI manage focus trapping and dismissal; follow the [Dialog guide](https://headlessui.com/react/dialog) for backdrops, portals, and initial focus.
- Use the documented `anchor` API for supported floating panels. See [Popover positioning](https://headlessui.com/react/popover#positioning-the-panel).
- Keep shared values and actions in Zustand; read them where needed. Let Headless UI manage internal interaction state when external control is unnecessary.
- When rendering custom elements with `as`, forward the props and ref required by Headless UI. See [Menu custom elements](https://headlessui.com/react/menu#rendering-as-different-elements).

These links target the official React documentation. Verify APIs against the installed package when documentation and package versions differ.
