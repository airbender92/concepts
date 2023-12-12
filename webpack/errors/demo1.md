## 一.
 Q: webpack : 无法加载文件 C:\Users\yambo\AppData\Roaming\npm\webpack.ps1，因为在此系统上禁止运行脚本。
 
 A: 这个错误提示表明你在运行Webpack时遇到了脚本执行权限的问题。在Windows系统上，PowerShell脚本默认是禁止执行的，为了解决这个问题，你可以尝试执行以下步骤：

1. **提升执行策略：** 打开 PowerShell 以管理员身份运行，然后执行以下命令：

    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

    这会将脚本执行策略更改为允许当前用户执行本地脚本。

2. **运行Webpack：** 再次尝试运行Webpack，看看是否仍然遇到相同的问题。

如果你仍然遇到问题，可以考虑使用以下命令，强制执行脚本：

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\yambo\AppData\Roaming\npm\webpack.ps1
```

请注意，这只是一个临时解决方法。在生产环境中，确保了解脚本的来源并谨慎更改执行策略，以避免潜在的安全风险。
