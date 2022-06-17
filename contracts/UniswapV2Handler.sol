// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Utils.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract UniswapV2Handler is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    /*======================== VARIABLES =======================*/
    IUniswapV2Router02 public swapRouter;

    /*======================== MULTATIVE =======================*/

    function run(bytes memory _data) external payable nonReentrant {
        (
            address _outputToken,
            address _to,
            uint256 _amountIn,
            uint256 _minAmountOut,
            address _relayer,
            address _swapRouter,
            address[] memory _swapPaths,
            uint256 _fee
        ) = abi.decode(
                _data,
                (address, address, uint256, uint256, address, address, address[], uint256)
            );
        require(_swapPaths.length >= 2, "SwapStrategyV1::constructor: Invalid swapPaths");
        swapRouter = IUniswapV2Router02(_swapRouter);
        address inputToken = _swapPaths[0];
        uint256 preOutputAmount = Utils.balanceOf(_outputToken, address(this));
        if (_outputToken == Utils.ETH_ADDRESS) {
            IERC20(inputToken).safeTransferFrom(msg.sender, address(this), _amountIn);
            IERC20(inputToken).safeApprove(address(swapRouter), 0);
            IERC20(inputToken).safeApprove(address(swapRouter), _amountIn);
            swapRouter.swapExactTokensForETH(
                _amountIn,
                _minAmountOut + _fee,
                _swapPaths,
                address(this),
                block.timestamp
            );
        } else {
            IERC20(inputToken).safeTransferFrom(msg.sender, address(this), _amountIn);
            IERC20(inputToken).safeApprove(address(swapRouter), 0);
            IERC20(inputToken).safeApprove(address(swapRouter), _amountIn);
            swapRouter.swapExactTokensForTokens(
                _amountIn,
                _minAmountOut + _fee,
                _swapPaths,
                address(this),
                block.timestamp
            );
        }
        uint256 postOutputAmount = Utils.balanceOf(_outputToken, address(this));
        uint256 amountOut = postOutputAmount - preOutputAmount;
        require(
            amountOut >= (_minAmountOut + _fee),
            "UniswapV2Handler::execute: amount out not enough"
        );
        Utils.transfer(_outputToken, _to, amountOut - _fee);
        if (_fee > 0) {
            Utils.transfer(_outputToken, _relayer, _fee);
        }
    }

    /// @notice receive ETH
    receive() external payable {}
}
