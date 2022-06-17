// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

library Utils {
    using SafeERC20 for IERC20;
    address public constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    /**
     * @notice Get the account's balance of token or ETH
     * @param _token - Address of the token
     * @param _addr - Address of the account
     * @return uint256 - Account's balance of token or ETH
     */
    function balanceOf(address _token, address _addr) internal view returns (uint256) {
        if (address(_token) == ETH_ADDRESS) {
            return _addr.balance;
        }

        return IERC20(_token).balanceOf(_addr);
    }

    function transfer(
        address _token,
        address _to,
        uint256 _amount
    ) internal {
        if (_token == ETH_ADDRESS) {
            (bool success, ) = payable(_to).call{value: _amount}("");
            require(success, "Utils::transfer: ETH_TRANSFER_FAILED");
        } else {
            IERC20(_token).safeTransfer(_to, _amount);
        }
    }
}
