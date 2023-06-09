import { Injectable } from '@nestjs/common';
import { Erc20Dto } from './dto/erc20.dto';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as solc from 'solc';
import path from 'path';

@Injectable()
export class ScService {
  async getErc20Template(dto: Erc20Dto) {
    const { name, symbol, totalSupply, mintable, burnable } = dto;
    const data = {
      name: name,
      symbol: symbol,
      totalSupply: totalSupply,
    };
    let templatePath;
    let sol_name;
    if (mintable && burnable) {
      templatePath = path.join(
        __dirname,
        'contracts',
        'erc20mintburnable.template',
      );
      sol_name = 'ERC20MintBurnableTemplate';
    } else if (mintable && !burnable) {
      templatePath = path.join(
        __dirname,
        'contracts',
        'erc20mintable.template',
      );
      sol_name = 'ERC20MintableTemplate';
    } else if (!mintable && burnable) {
      templatePath = path.join(
        __dirname,
        'contracts',
        'erc20burnable.template',
      );
      sol_name = 'ERC20BurnableTemplate';
    } else {
      templatePath = path.join(__dirname, 'contracts', 'erc20.template');
      sol_name = 'ERC20Template';
    }
    const templateString = fs.readFileSync(templatePath).toString();
    const resultString = nunjucks.renderString(templateString, data);
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
      },
    };
    const compiled = await solc.compile(JSON.stringify(input), {
      import: this.findImports,
    });

    const compiledOutput = JSON.parse(compiled);
    const contractBytecode =
      compiledOutput.contracts['contract.sol'][name].evm.bytecode.object;
    return contractBytecode;
  }

  findImports = (path: string) => {
    const code = fs.readFileSync('dist/sc/contracts/' + path).toString();
    return {
      contents: code,
    };
  };
}
