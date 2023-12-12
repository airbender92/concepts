`lerna` 是一个用于管理 JavaScript 项目中的多包仓库的工具。它提供了一些命令，用于协调和管理多个相关的包，以简化项目的开发、测试和发布。以下是一些常见的 `lerna` 命令及其用途：

1. **`lerna init`:**
   - 初始化一个新的 `lerna` 项目。它会创建一个初始的 `lerna.json` 配置文件。

2. **`lerna create <packageName>`:**
   - 在当前 `lerna` 项目中创建一个新的包。`<packageName>` 是新包的名称。

3. **`lerna add <package>[@version] [--dev] [--exact]`:**
   - 将依赖包添加到所有包中。可选参数 `--dev` 将其添加为开发依赖，`--exact` 将指定的版本安装为确切版本。

4. **`lerna bootstrap`:**
   - 安装所有包的依赖项并连接相互依赖的本地包。

5. **`lerna clean`:**
   - 删除每个包中的 `node_modules` 目录以及各种锁文件。

6. **`lerna ls`:**
   - 列出当前项目的所有包。

7. **`lerna run <script>`:**
   - 在每个包中运行一个 npm 脚本。

8. **`lerna exec <command>`:**
   - 在每个包中执行给定的命令。

9. **`lerna diff`:**
   - 显示当前仓库中每个包的差异。

10. **`lerna publish`:**
    - 发布每个包的新版本，根据更改自动更新版本号。

这只是一些 `lerna` 命令的示例，`lerna` 支持许多其他命令和选项，具体的使用方式可以参考 [官方文档](https://github.com/lerna/lerna) 以获取更详细的信息和示例。