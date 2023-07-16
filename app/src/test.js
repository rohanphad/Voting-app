import { connectWeb3 } from "./web3_function";

async function print(){
    const {accounts, instance} = await connectWeb3();

    console.log(accounts,instance);

}

print();