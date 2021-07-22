pragma solidity ^0.8.4;

contract NFTToken {
    event Mint(address indexed _to, uint256 indexed _tokenId, bytes32 _ipfsHash);
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event SAFETransferFrom(address _from, address _to, uint256 _tokenId);
    event MintUri(address indexed _to, uint256 indexed _tokenId, string indexed uri);

    uint256 tokenCounter = 1;
    mapping(uint256 => address) internal idToOwner;

    function mint(address _to, bytes32 _ipfsHash) public {
        uint256 _tokenId = tokenCounter;
        idToOwner[_tokenId] = _to;
        tokenCounter++;
        emit Mint(_to, _tokenId, _ipfsHash);
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(msg.sender == idToOwner[_tokenId]);
        idToOwner[_tokenId] = _to;
        emit Transfer(msg.sender, _to, _tokenId);
    }
    
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes32 _hash) public payable returns(bytes32 hash){
        require(msg.sender==idToOwner[_tokenId]);
        require(_from == idToOwner[_tokenId]);
        idToOwner[_tokenId] = _to;
        emit SAFETransferFrom(msg.sender,_to, _tokenId);
        return _hash;
    }
    
    function mint(address _to, string memory _uri) public {
        uint256 _tokenId = tokenCounter;
        idToOwner[_tokenId] = _to;
        tokenCounter++;
        emit MintUri(_to,_tokenId,_uri);
    } 
    
}
