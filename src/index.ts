import "module-alias/register";
import  {singleApiCall}  from "@Tasks/taskOne"
import { parallelApiCalls } from "@Tasks/parallelApiCalls";
import { fileOperation } from "@Tasks/fileOperations";
console.log("Calling single Api Call")
async function main(){
    // await singleApiCall();
    // await parallelApiCalls()
    await fileOperation()
}

main()