// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract UserRegistry {
    enum UserRole {
        Regular,
        Merchant
    }

    mapping(address => UserRole) public userRoles;

    event UserAuthorized(address indexed user, UserRole role);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function authorizeMerchant(address _merchant) external onlyAdmin {
        userRoles[_merchant] = UserRole.Merchant;
        emit UserAuthorized(_merchant, UserRole.Merchant);
    }

    function isMerchant(address _user) external view returns (bool) {
        return userRoles[_user] == UserRole.Merchant;
    }
}
