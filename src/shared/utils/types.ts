export type NotificationType =
  'show-add'
  | 'add-error'
  | 'get-all-error'
  | 'delete-error'
  | 'toggle-error'
  | 'delete-all-error'
  | 'edit-error'

export interface RadioOption {
  value: string;
  text: string;
}