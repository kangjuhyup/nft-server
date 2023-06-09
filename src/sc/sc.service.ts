import { Injectable } from '@nestjs/common';
import { Erc20Dto } from './dto/erc20.dto';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as solc from 'solc';
import path from 'path';

@Injectable()
export class ScService {

  async getErc20Template(dto: Erc20Dto) {
    const { name, symbol, totalSupply, owner, mintable, burnable } = dto;
    let data = {
      name: name,
      symbol: symbol,
      totalSupply: totalSupply,
      owner : owner,
      burn : '',
      mint : ''
    };
    const burn:string = `
    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }
    `
    const mint:string = `
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    `
    const templatePath = path.join(__dirname, 'contracts', 'erc20.template');
    const sol_name = 'ERC20';
    if (mintable && burnable) {
        data = {
            ...data,
            burn : burn,
            mint : mint
        }
    } else if (mintable && !burnable) {
        data = {
            ...data,
            mint : mint
        }
    } else if (!mintable && burnable) {
        data = {
            ...data,
            burn : burn,
        }
    } 
    const templateString = fs.readFileSync(templatePath).toString();
    const resultString = nunjucks.renderString(templateString, data);
    console.log(resultString);
    return await this.compileContract(sol_name, resultString);
  }

  async compileContract(name: string, source: string) {
    const input = {
      language: 'Solidity',
      sources: {
        'contract.sol': {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['evm.bytecode'],
          },
        },
        optimizer : {
            enabled : true,
            runs : 200,
        }
      },
    };
    const compiled = await solc.compile(JSON.stringify(input), {
      import: this.findImports,
    });

    const compiledOutput = JSON.parse(compiled);
    console.log(compiledOutput);
    const contractBytecode =
      compiledOutput.contracts['contract.sol'][name].evm.bytecode.object;
    return `0x`+contractBytecode;
  }

  findImports = (path: string) => {
    const code = fs.readFileSync('dist/sc/contracts/' + path).toString();
    return {
      contents: code,
    };
  };
}
