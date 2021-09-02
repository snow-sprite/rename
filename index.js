let fs = require('fs');//引用文件系统模块
     
let PATH = `./images/`;//当前文件夹
 
let ext = {
    readFileList: function(path, filesList) {
        filesList = filesList || [];
        let files = fs.readdirSync(path);
        files.forEach(function (filename, index) {
            //var stat = fs.statSync(path + filename);//读取的文件信息
            if (fs.statSync(path + filename).isDirectory()) {//isDirectory 判断是不是目录
                //递归读取文件
                ext.readFileList(`${path}${filename}/`, filesList);
            } else {
                filesList.push({
                    path,//路径
                    filename,//名字
                });
            }
        })
        return filesList
    },
    //修改文件名称
    rename: function(oldPath, newPath, filename, newSuffixFile) {
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                throw err;
            }
            console.log(`${filename} 修改为 => ${newSuffixFile}`)
        });
    },
    //批量修改文件名称
    getChangeFiles: function (path, oldSuffix, newSuffix) {
        if(!oldSuffix && !newSuffix){
            console.log(`后缀未设置`);
        }
        this.readFileList(path).forEach((item) => {
            if(item.filename.indexOf(oldSuffix) > -1){
                console.log(item.filename)
                let oldPath = item.path + item.filename,
                newSuffixFile = item.filename.split(oldSuffix)[0] + newSuffix,
                newPath = item.path + newSuffixFile
                ext.rename(oldPath, newPath, item.filename, newSuffixFile);
            }
        });
    }
}
 
ext.getChangeFiles(PATH, `.jpg`, `.png`);
