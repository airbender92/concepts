```html
<pre>
    <code>
    错误提示如下，分析可知是 maven.google.com 访问失败造成的：
HTTP host https://maven.google.com/ is not reachable. Reason: An error occurred while checking the HTTP host: Operation timed out 

[1] 打开path-to-flutter-sdk/packages/flutter_tools/lib/src/http_host_validator.dart文件，修改https://maven.google.com/为 google maven 的国内镜像，如https://dl.google.com/dl/android/maven2/
[2] 设置系统环境变量
FLUTTER_STORAGE_BASE_URL  -&gt; https://storage.flutter-io.cn
PUB_HOSTED_URL -&gt; https://pub.flutter-io.cn
[3] 去到flutter\bin\cache目录，删除flutter_tools.snapshot文件。请不要删除cache文件夹，不然需要下载很多东西。
[4] 重新执行flutter doctor
</code>
</pre>
```