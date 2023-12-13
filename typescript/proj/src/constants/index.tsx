/**
 * 这里的const/type模式
 * 允许我们以容易访问和重构的方式使用TypeScript的字符串字面量类型
 * INCREMENT_ENTHUSIASM is a constant string with the value 'INCREMENT_ENTHUSIASM'.
 * Immediately following it, 
 * you define a type with the same name 
 * using TypeScript's typeof operator. 
 * This type will be equal to the string literal type 'INCREMENT_ENTHUSIASM'. 
 * This pattern is useful for ensuring that 
 * you use the correct string values consistently.
 */
export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;