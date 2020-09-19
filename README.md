# cypress_automation_test
步骤1：本地安装node.js。
（1）下载地址：https://nodejs.org/zh-cn/
（2）版本：12.18.4
（3）配置环境变量。
（4）检测：powershell——》执行命令：node -v
步骤2：工程检出
步骤3：项目依赖
（1）powershell——》切到检出工程的根目录
（2）执行命令：npm install --save-dev cypress@4.9.0。（注意：指定安装5.0以下版本的cypress，因为项目中的file-upload插件在高版本的cypress未适配）
（3）执行命令：npm install --save-dev。安装其它项目依赖包
步骤4：启动cypress
（1）powershell——》切到项目更目录
（2）执行命令：npm run cypress:open。将打开cypress窗口。
