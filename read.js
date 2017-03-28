var jsonfile = require('jsonfile')

const target_path = './data.json';

module.exports = function(target_path, cb){
    jsonfile.readFile(target_path, (err, file)=>{
        function start(parentObj, obj){
            var keyArr = Object.keys(obj);
            keyArr.forEach(key=>{
                switch (typeof(obj[key])) {
                    case 'string':
                    if(Array.isArray(parentObj)){
                        parentObj[0][key] = "String"
                    }else{
                        parentObj[key] = "String"
                    }
                        break;
                    case 'number':
                    if(Array.isArray(parentObj)){
                        parentObj[0][key] = "Number"
                    }else{
                        parentObj[key] = "Number"
                    }
                        break;
                    case 'object':
                        if(Array.isArray(obj[key])){
                            parentObj[key] = [{}]
                            parentObj[key] = start(parentObj[key], obj[key][0])
                        }else{
                            parentObj[key] = {}
                            parentObj[key] = start(parentObj[key], obj[key])
                        }
                        break;
                    default:
                        
                        break;
                }
            })
            return parentObj;
        }
        const exportFile = start({},file);
        jsonfile.writeFile('./typelize-result.json', exportFile, {spaces: 2}, function(err){
            if(err){cb(err, null)}
            cb(null, true)
        })
    })
}