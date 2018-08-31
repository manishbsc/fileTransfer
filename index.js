var path = require('path');
const readline = require('readline');

const fs = require('fs')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Hello,Please enter the directory to proceed?\n'
});

rl.prompt();
rl.on('line', (line) => {
   
    fs.readdir(line,(err,file)=>{
        if(err) {
            console.log("No Source directory found\n")
            console.log("please Renter directory Again")
        }
        else if(file.length==0){
            console.log("Directory is Empty You cannot proceed forward")
                rl.prompt()
        }
        else {
            console.log("Directory found Fetching Files\n")
            var array = `${file}`.split(",");
            for(let i=0;i<array.length;i++)
            {
                console.log(i+"  "+array[i]);
            }
          console.log("please Enter file you want to Copy?")
          rl.question(' please Enter file you want to Copy?', (answer) => {
              if(answer>=array.length)
              {
                  console.log("you have entered invalid value of files in directory")
                  rl.prompt()
              }
              
              else{
              var fileInput=`${line}/${array[answer]}`
            console.log(`File entered is ${fileInput}`);
                if(true)
                {
                    rl.question(' please Enter destination Directory you want to Copy?', (answer) => {
                        console.log(answer)
                        fs.readdir(answer,(err1,file)=>{
                            if(err1) {
                                console.log("No Destination directory found\n")
                                console.log("please Renter source directory Again from begining")
                            } else {
                                var ext = path.extname(`${fileInput}`);
                                    let readStream = fs.createReadStream(`${fileInput}`)
                                    let writeStream = fs.createWriteStream(`${answer}/copiedFile${ext}`)
                                    readStream.on('data',(chunk)=>{
                                        writeStream.write(chunk)
                                    })
                                    readStream.on('end',()=>{
                                        console.log('File Read Complete')
                                        writeStream.end()
                                        console.log('File Write Complete')
                                        console.log(`Done.! file is copied with name copiedFile${ext}`)
                                        rl.close()
                                    })
                                
                                
                            }
                        })
                    })
                }
              }
          });
        }
    })

}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});