export type CategoryType = 1 | 2 | 3 | 4;
export interface ViewModeProps{
    id: string | number,
    label: string,
    value: CategoryType,
}