// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <=0.9.0;

contract Lottery{
    address public manager;
    address payable[] public players;
    address payable public winner;

    constructor(){
        manager = msg.sender;
    }

    function participate() payable public  {
        require(msg.value == 0.001 ether,"Please pay more than 0.001 ether  to participate in lottery");
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function random() internal view returns(uint){
         return uint(keccak256( abi.encodePacked(block.prevrandao,block.timestamp,players.length)));
    }

    function pickWinner() public {
        require(manager == msg.sender,"Please wait for the manager to pick the winner for you");
        require(players.length>=3,"Players are less than 3");
        
        uint r = random();
        uint index = r%players.length;
        winner = players[index];
        winner.transfer(getBalance());
        players = new address payable[](0);
    }
    
}