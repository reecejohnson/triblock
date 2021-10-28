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
    '9CA3AF', '6B7280', '4B5563', '374151', '1F2937',
    '111827', 'FEE2E2', 'FECACA', 'FCA5A5', 'F87171',
    'EF4444', 'B91C1C', '991B1B', '7F1D1D', 'FEF3C7',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706',
    'B45309', '92400E', '78350F', 'D1FAE5', '6EE7B7',
    '34D399', '10B981', '059669', '047857', '065F46',
    '064E3B', 'DBEAFE', 'BFDBFE', '93C5FD', '60A5FA',
    '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'E0E7FF', 'C7D2FE', 'A5B4FC', '818CF8', '6366F1',
    '4F46E5', '4338CA', '3730A3', '312E81', 'DDD6FE',
    'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9',
    '5B21B6', 'FBCFE8', 'F9A8D4', 'F472B6', 'DB2777',
    'BE185D', '9D174D', '831843'
    ];
    string[] private secondColours = [
    '9CA3AF', '6B7280', '4B5563', '374151', '1F2937',
    '111827', 'FEE2E2', 'FECACA', 'FCA5A5', 'F87171',
    'EF4444', 'B91C1C', '991B1B', '7F1D1D', 'FEF3C7',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706',
    'B45309', '92400E', '78350F', 'D1FAE5', '6EE7B7',
    '34D399', '10B981', '059669', '047857', '065F46',
    '064E3B', 'DBEAFE', 'BFDBFE', '93C5FD', '60A5FA',
    '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'E0E7FF', 'C7D2FE', 'A5B4FC', '818CF8', '6366F1',
    '4F46E5', '4338CA', '3730A3', '312E81', 'DDD6FE',
    'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9',
    '5B21B6', 'FBCFE8', 'F9A8D4', 'F472B6', 'DB2777',
    'BE185D', '9D174D', '831843'
    ];
    string[] private thirdColours = [
    '9CA3AF', '6B7280', '4B5563', '374151', '1F2937',
    '111827', 'FEE2E2', 'FECACA', 'FCA5A5', 'F87171',
    'EF4444', 'B91C1C', '991B1B', '7F1D1D', 'FEF3C7',
    'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706',
    'B45309', '92400E', '78350F', 'D1FAE5', '6EE7B7',
    '34D399', '10B981', '059669', '047857', '065F46',
    '064E3B', 'DBEAFE', 'BFDBFE', '93C5FD', '60A5FA',
    '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    'E0E7FF', 'C7D2FE', 'A5B4FC', '818CF8', '6366F1',
    '4F46E5', '4338CA', '3730A3', '312E81', 'DDD6FE',
    'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9',
    '5B21B6', 'FBCFE8', 'F9A8D4', 'F472B6', 'DB2777',
    'BE185D', '9D174D', '831843'
    ];

    string baseSVG = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 500 500'><rect width='500' height='500' style='fill:rgb(243, 244, 246)'/>";
    string baseFirstRectangle = "<rect x='68.299' y='68.299' width='68.299' height='283.677'";
    string baseSecondRectangle = "<rect x='216.741' y='148.024' width='68.299' height='283.677'";
    string baseThirdRectangle = "<rect x='365.035' y='68.299' width='68.299' height='283.677'";

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

    constructor() ERC721 ('TriLines', 'TRI') {
        console.log('This is my NFT contract.');
    }
    function mintNft() public payable {
        uint256 newItemId = _tokenIds.current();

        Colours memory colours = pickRandomColours();

        string memory finalSvg = generateSVG(colours.first, colours.second, colours.third);
        console.log("--------------------\n");
        console.log(finalSvg);
        console.log("--------------------\n");
        string memory name = string(abi.encodePacked("Tri Lines #", uint2str(newItemId)));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', name,
                        '", "description": "Generative tri line art built on the blockchain.", "image": "data:image/svg+xml;base64,',
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

        //        console.log("\n--------------------");
        //        console.log(finalTokenUri);
        //        console.log("--------------------\n");

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