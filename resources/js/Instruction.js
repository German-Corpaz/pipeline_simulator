import * as utilities from "./utilities.js"

export default class Instruction{

    constructor(instruction){

        let instructionData=parseInstruction(instruction.trim());
        // this.fullInstruction=data.fullInstruction;
        // this.mnemonic=data.mnemonic;
        // this.destinationRegister=data.destinationRegister;
        // this.sourceRegister1=data.sourceRegister1;
        // this.sourceRegister2=data.sourceRegister2;
        // this.constantValue=data.constantValue;
        // this.branchAddress=data.branchAddress;
        // this.jumpAddress=data.jumpAddress;
        // this.memoryOffset=data.memoryOffset;
        // this.hasErrors=data.hasErrors;
        // this.errorMessage=data.errorMessage;

    }


}

function parseInstruction(instruction){
    let mnemonic=utilities.getMnemonic(instruction);
    let parameters;
    let fullInstruction;
    let parseResult={};
    let sourceRegister1;
    let sourceRegister2;
    let destinationRegister;
    let constant;
    let branchAddress;
    let memoryOffset;
    if (utilities.isValidMnemonic(mnemonic)){
        parameters=utilities.getParameters(instruction);
        fullInstruction=mnemonic+" "+parameters;
        let arrayParameters=parameters.split(",");
        if (utilities.threeRegisterInstruction(mnemonic)){
            if (arrayParameters.length!=3){
                parseResult.error="The instruction "+mnemonic+" takes three Registers separated with ',' as parameters"
            }
            else{
                if (utilities.isValidRegister(arrayParameters[2])){
                    sourceRegister2=utilities.getRegisterNumber(arrayParameters[2]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[2];
                }
                if (utilities.isValidRegister(arrayParameters[1])){
                    sourceRegister1=utilities.getRegisterNumber(arrayParameters[1]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[1];
                }
                if (utilities.isValidRegister(arrayParameters[0])){
                    destinationRegister=utilities.getRegisterNumber(arrayParameters[0]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[0];
                }

            }
        }
        else if (utilities.twoRegistersOneConstantInstruction(mnemonic)){
            if (arrayParameters.length!=3){
                parseResult.error="The instruction "+mnemonic+" takes two Registers and one Constant separated with ',' as parameters"
            }
            else{
                if (utilities.isValidConstant(arrayParameters[2])){
                    constant=utilities.getConstant(arrayParameters[2]);
                }
                else{
                    parseResult.error="Invalid Constant "+arrayParameters[2];
                }
                if (utilities.isValidRegister(arrayParameters[1])){
                    sourceRegister1=utilities.getRegisterNumber(arrayParameters[1]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[1];
                }
                if (utilities.isValidRegister(arrayParameters[0])){
                    destinationRegister=utilities.getRegisterNumber(arrayParameters[0]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[0];
                }
            }
        }
        else if(utilities.twoRegisterInstruction(mnemonic)){
            if (arrayParameters.length!=2){
                parseResult.error="The instruction "+mnemonic+" takes two Registers separated with ',' as parameters"
            }
            else{
                if (utilities.isValidRegister(arrayParameters[1])){
                    sourceRegister1=utilities.getRegisterNumber(arrayParameters[1]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[1];
                }
                if (utilities.isValidRegister(arrayParameters[0])){
                    destinationRegister=utilities.getRegisterNumber(arrayParameters[0]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[0];
                }
            }
        }
        else if(utilities.branchInstruction(mnemonic)){
            if (arrayParameters.length!=3){
                parseResult.error="The instruction "+mnemonic+" takes two Registers and one relative address separated with ',' as parameters"
            }
            else{
                if (utilities.isValidConstant(arrayParameters[2])){
                    branchAddress=utilities.getConstant(arrayParameters[2]);
                }
                else{
                    parseResult.error="Invalid Branch Address "+arrayParameters[2];
                }
                if (utilities.isValidRegister(arrayParameters[1])){
                    sourceRegister1=utilities.getRegisterNumber(arrayParameters[1]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[1];
                }
                if (utilities.isValidRegister(arrayParameters[0])){
                    sourceRegister2=utilities.getRegisterNumber(arrayParameters[0]);
                }
                else{
                    parseResult.error="Invalid Register "+arrayParameters[0];
                }

            }
        }
        else if(utilities.memoryInstruction(mnemonic)){
            if (arrayParameters.length!=2){
                parseResult.error="The instruction "+mnemonic+" takes one Registers and one memory access separated with ',' as parameters"
            }
            else{
                if (utilities.isValidMemoryAccess(arrayParameters[1])){
                    memoryOffset=utilities.getOffset(arrayParameters[1]);
                    sourceRegister1=utilities.getRegisterFromMemory(arrayParameters[1]);
                }
                else{
                    parseResult.error="Inavalid memory access "+arrayParameters[1];
                }
                if (utilities.isValidRegister(arrayParameters[0])){
                    if (mnemonic=="LW") destinationRegister=utilities.getRegisterNumber(arrayParameters[0])
                    else if (mnemonic=="SW") sourceRegister2=utilities.getRegisterNumber(arrayParameters[0])
                }
                else{
                    parseResult.error="Inavalid Register "+arrayParameters[0];
                }
            }

        }
    }
    else{
        parseResult.error="Invalid Mnemonic :"+mnemonic;
    }
    console.log(destinationRegister,sourceRegister1,sourceRegister2,constant,branchAddress,memoryOffset)
    console.log(parseResult.error)

    return parseResult;

}