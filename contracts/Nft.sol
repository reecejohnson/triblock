// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

import {Base64} from "./libraries/Base64.sol";

contract Nft is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string[] private firstColours = [
    'FECACA', 'FCA5A5', 'F87171', 'EF4444', 'DC2626', 'B91C1C', '991B1B', '7F1D1D',
    'FED7AA', 'FDBA74', 'FB923C', 'F97316', 'EA580C', 'C2410C', '9A3412', '7C2D12',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706', 'B45309', '92400E', '78350F',
    'D9F99D', 'BEF264', 'A3E635', '84CC16', '65A30D', '4D7C0F', '3F6212', '365314',
    'BBF7D0', '86EFAC', '4ADE80', '22C55E', '16A34A', '15803D', '166534', '14532D',
    'A7F3D0', '6EE7B7', '34D399', '10B981', '059669', '047857', '065F46', '064E3B',
    '99F6E4', '5EEAD4', '2DD4BF', '14B8A6', '0D9488', '0F766E', '115E59', '134E4A',
    'A5F3FC', '67E8F9', '22D3EE', '06B6D4', '0891B2', '0E7490', '155E75', '164E63',
    'BAE6FD', '7DD3FC', '38BDF8', '0EA5E9', '0284C7', '0369A1', '075985', '0C4A6E',
    'BFDBFE', '93C5FD', '60A5FA', '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'C7D2FE', 'A5B4FC', '818CF8', '6366F1', '4F46E5', '4338CA', '3730A3', '312E81',
    'DDD6FE', 'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9', '5B21B6', '4C1D95',
    'E9D5FF', 'D8B4FE', 'C084FC', 'A855F7', '9333EA', '7E22CE', '6B21A8', '581C87',
    'F5D0FE', 'F0ABFC', 'E879F9', 'D946EF', 'C026D3', 'A21CAF', '86198F', '701A75',
    'FBCFE8', 'F9A8D4', 'F472B6', 'EC4899', 'DB2777', 'BE185D', '9D174D', '831843',
    'FECDD3', 'FDA4AF', 'FB7185', 'F43F5E', 'E11D48', 'BE123C', '9F1239', '881337'
    ];

    string[] private secondColours = [
    'FECACA', 'FCA5A5', 'F87171', 'EF4444', 'DC2626', 'B91C1C', '991B1B', '7F1D1D',
    'FED7AA', 'FDBA74', 'FB923C', 'F97316', 'EA580C', 'C2410C', '9A3412', '7C2D12',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706', 'B45309', '92400E', '78350F',
    'D9F99D', 'BEF264', 'A3E635', '84CC16', '65A30D', '4D7C0F', '3F6212', '365314',
    'BBF7D0', '86EFAC', '4ADE80', '22C55E', '16A34A', '15803D', '166534', '14532D',
    'A7F3D0', '6EE7B7', '34D399', '10B981', '059669', '047857', '065F46', '064E3B',
    '99F6E4', '5EEAD4', '2DD4BF', '14B8A6', '0D9488', '0F766E', '115E59', '134E4A',
    'A5F3FC', '67E8F9', '22D3EE', '06B6D4', '0891B2', '0E7490', '155E75', '164E63',
    'BAE6FD', '7DD3FC', '38BDF8', '0EA5E9', '0284C7', '0369A1', '075985', '0C4A6E',
    'BFDBFE', '93C5FD', '60A5FA', '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'C7D2FE', 'A5B4FC', '818CF8', '6366F1', '4F46E5', '4338CA', '3730A3', '312E81',
    'DDD6FE', 'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9', '5B21B6', '4C1D95',
    'E9D5FF', 'D8B4FE', 'C084FC', 'A855F7', '9333EA', '7E22CE', '6B21A8', '581C87',
    'F5D0FE', 'F0ABFC', 'E879F9', 'D946EF', 'C026D3', 'A21CAF', '86198F', '701A75',
    'FBCFE8', 'F9A8D4', 'F472B6', 'EC4899', 'DB2777', 'BE185D', '9D174D', '831843',
    'FECDD3', 'FDA4AF', 'FB7185', 'F43F5E', 'E11D48', 'BE123C', '9F1239', '881337'
    ];

    string[] private thirdColours = [
    'FECACA', 'FCA5A5', 'F87171', 'EF4444', 'DC2626', 'B91C1C', '991B1B', '7F1D1D',
    'FED7AA', 'FDBA74', 'FB923C', 'F97316', 'EA580C', 'C2410C', '9A3412', '7C2D12',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706', 'B45309', '92400E', '78350F',
    'D9F99D', 'BEF264', 'A3E635', '84CC16', '65A30D', '4D7C0F', '3F6212', '365314',
    'BBF7D0', '86EFAC', '4ADE80', '22C55E', '16A34A', '15803D', '166534', '14532D',
    'A7F3D0', '6EE7B7', '34D399', '10B981', '059669', '047857', '065F46', '064E3B',
    '99F6E4', '5EEAD4', '2DD4BF', '14B8A6', '0D9488', '0F766E', '115E59', '134E4A',
    'A5F3FC', '67E8F9', '22D3EE', '06B6D4', '0891B2', '0E7490', '155E75', '164E63',
    'BAE6FD', '7DD3FC', '38BDF8', '0EA5E9', '0284C7', '0369A1', '075985', '0C4A6E',
    'BFDBFE', '93C5FD', '60A5FA', '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'C7D2FE', 'A5B4FC', '818CF8', '6366F1', '4F46E5', '4338CA', '3730A3', '312E81',
    'DDD6FE', 'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9', '5B21B6', '4C1D95',
    'E9D5FF', 'D8B4FE', 'C084FC', 'A855F7', '9333EA', '7E22CE', '6B21A8', '581C87',
    'F5D0FE', 'F0ABFC', 'E879F9', 'D946EF', 'C026D3', 'A21CAF', '86198F', '701A75',
    'FBCFE8', 'F9A8D4', 'F472B6', 'EC4899', 'DB2777', 'BE185D', '9D174D', '831843',
    'FECDD3', 'FDA4AF', 'FB7185', 'F43F5E', 'E11D48', 'BE123C', '9F1239', '881337'
    ];

    string baseSVG = "<svg height='500' width='500' viewBox='0 0 500 500' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='500' height='500' fill='rgb(243, 244, 246)'/>";
    string baseFirstRectangle = "<path d='M150.605 71.4286H104.479L71.4286 222.21L104.116 222.523L72.3366 358.571L157.143 175.502H119.37L150.605 71.4286Z'";
    string baseSecondRectangle = "<path d='M430.605 71.4286H384.479L351.429 222.21L384.116 222.523L352.337 358.571L437.143 175.502H399.37L430.605 71.4286Z'";
    string baseThirdRectangle = "<path d='M290.605 141.429H244.479L211.429 292.21L244.116 292.523L212.337 428.571L297.143 245.502H259.37L290.605 141.429Z'";

    struct Colours {
        string first;
        string second;
        string third;
    }

    event NewNFTMinted(address sender, uint256 tokenId);
    event MetadataCreated(string json);
    event FirstColourSelected(string colour);
    event SecondColourSelected(string colour);
    event ThirdColourSelected(string colour);
    event ColoursSelected(string first, string second, string third);

    constructor() ERC721 ('Tribolt', 'TBOLT') {}

    function mintNft() public payable {
        uint256 newItemId = _tokenIds.current();

        Colours memory colours = pickRandomColours();

        string memory finalSvg = generateSVG(colours.first, colours.second, colours.third);
        console.log("--------------------\n");
        console.log(finalSvg);
        console.log("--------------------\n");
        string memory name = string(abi.encodePacked("TriBolt #", uint2str(newItemId + 1)));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', name,
                        '", "description": "Generative tri bolt art built on the blockchain.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );
        emit MetadataCreated(json);

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();

        console.log('An NFT with ID %s has been minted to %s', newItemId, msg.sender);

        emit NewNFTMinted(msg.sender, newItemId);
    }

    function pickRandomColours() internal returns (Colours memory colours) {
        string memory first = pickRandomColour(1, firstColours);
        console.log("first: ", first);
        emit FirstColourSelected(first);
        string memory second = pickRandomColour(2, secondColours);
        console.log("second: ", second);
        emit SecondColourSelected(second);
        string memory third = pickRandomColour(3, thirdColours);
        console.log("third: ", third);
        emit ThirdColourSelected(third);
        console.log(firstColours.length);
        emit ColoursSelected(first, second, third);
        return Colours(first, second, third);
    }

    function pickRandomColour(uint number, string[] storage colours) internal returns (string memory) {
        require(colours.length > 0);
        uint256 rand = random(number) % colours.length;
        console.log('random ', rand);
        string memory color = colours[rand];
        removeColourFromArray(rand, colours);
        return color;
    }

    function random(uint number) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(
                block.difficulty * number,
                block.timestamp * number,
                msg.sender,
                firstColours.length
            )));
    }

    function generateSVG(string memory firstColour, string memory secondColour, string memory thirdColour) internal view returns (string memory) {
        return string(abi.encodePacked(
                baseSVG,
                generateLine(baseFirstRectangle, firstColour),
                generateLine(baseSecondRectangle, secondColour),
                generateLine(baseThirdRectangle, thirdColour),
                "</svg>"
            ));
    }

    function generateLine(string memory baseRectangle, string memory colour) internal pure returns (string memory) {
        return string(abi.encodePacked(baseRectangle, " style='fill:#", colour, "'/>"));
    }

    function removeColourFromArray(uint index, string[] storage colours) internal {
        require(index < colours.length);
        colours[index] = colours[colours.length - 1];
        colours.pop();
    }

    function getFirstColours() public view returns (string[] memory) {
        return firstColours;
    }

    function getSecondColours() public view returns (string[] memory) {
        return secondColours;
    }

    function getThirdColours() public view returns (string[] memory) {
        return thirdColours;
    }

    function hasAtLeastOneTriBolt(address wallet) public view returns (bool) {
        return balanceOf(wallet) > 0;
    }

    function uint2str(
        uint256 _i
    )
    internal
    pure
    returns (string memory str)
    {
        if (_i == 0)
        {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0)
        {
            length++;
            j /= 10;
        }
        bytes memory bytesString = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0)
        {
            bytesString[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        str = string(bytesString);
    }
}