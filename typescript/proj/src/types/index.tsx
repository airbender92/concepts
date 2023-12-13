/**
 * 我们需要定义Redux保存的state的结构。
 *  创建src/types/index.tsx文件，
 * 它保存了类型的定义，我们在整个程序里都可能用到。
 */
export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
}