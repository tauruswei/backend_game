// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @title ERC20StakingPool
 * @dev This contract allows users to stake ERC20 tokens and earn interest on them over a 90-day period.
 * The earlier a user stakes, the higher the interest rate, which will slope downward over time.
 */
contract ERC20StakingPool {
    // Stores the timestamp when contract was deployed
    uint256 public contractStartTime = block.timestamp;

    // Stores total staked amount
    uint256 public totalStakedAmount;

    // Stores staked amount per user
    mapping(address => uint256) private _stakedAmount;

    // Stores the interest rate
    uint256 private _interestRate = 0;

    // Stores the duration of the staking period in seconds
    uint256 private constant _stakingDuration = 90 days;

    /**
     * @dev This function allows the user to stake the ERC20 tokens.
     * It increases the user's staked balance and the total staked amount
     * @param amount Amount of the ERC20 tokens to be staked
     */
    function stake(uint256 amount) external {
        require(amount > 0, "StakingPool: Cannot stake zero tokens");

        // Increase the stakedAmount of the user
        _stakedAmount[msg.sender] += amount;
        // Increase the total staked amount
        totalStakedAmount += amount;

        // Calculate the interest rate depending on the time at which user stakes
        _calculateInterestRate();
    }

    /**
     * @dev This function allows the user to claim the staking rewards.
     * It calculates the rewards for the staked tokens and transfers the tokens to the user's address.
     */
    function claimRewards() external {
        uint256 rewards = _calculateRewards(msg.sender);
        require(rewards > 0, "StakingPool: You have no rewards to claim");

        // Transfer the rewards to users
        // Note: In a real-world scenario, it is recommended to use a separate transaction to avoid re-entrancy attack
        (bool sent, ) = msg.sender.call{value: rewards}("");
        require(sent, "StakingPool: Failed to send rewards to user");

        // Update the staking information of the user
        _stakedAmount[msg.sender] = 0;
        _interestRate = 0;
    }

    /**
     * @dev This function returns the total staked amount of the given user.
     * @param account Address of the user.
     * @return uint256 staked amount of the user.
     */
    function stakedAmount(address account) external view returns (uint256) {
        return _stakedAmount[account];
    }

    /**
     * @dev Internal function to calculate the interest rate based on the staking time
     */
    function _calculateInterestRate() internal {
        uint256 currentTime = block.timestamp;

        // Calculate the time passed since the contract deployment
        uint256 elapsedTime = currentTime - contractStartTime;

        // Calculate the elapsed time as a percentage of the staking duration
        uint256 elapsedTimePerc = (elapsedTime * 100) / _stakingDuration;

        // Calculate the interest rate depending on the elapsed time
        _interestRate = 100 - elapsedTimePerc;
    }

    /**
     * @dev Internal function to calculate the rewards of the given user to be claimed.
     * @param account Address of the user.
     * @return uint256 the rewards due to the user.
     */
    function _calculateRewards(address account) internal view returns (uint256) {
        // Calculate the total rewards
        uint256 totalRewards = (totalStakedAmount * _interestRate) / 100;

        // Calculate the user's rewards
        uint256 userRewards = (totalRewards * _stakedAmount[account]) / totalStakedAmount;

        return userRewards;
    }
}