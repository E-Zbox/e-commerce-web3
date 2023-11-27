// Sources flattened with hardhat v2.19.1 https://hardhat.org

// SPDX-License-Identifier: MIT

// File contracts/UserRegistry.sol

// Original license: SPDX_License_Identifier: MIT
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


// File contracts/ECommerce.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity 0.8.19;
contract ECommerce {
    address public admin;
    UserRegistry public userRegistry;

    enum ProductStatus {
        Active,
        Inactive
    }

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        ProductStatus status;
        address merchant;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductCreated(uint256 indexed id, string name, address merchant);
    event ProductUpdated(uint256 indexed id, string newName);
    event ProductDeleted(uint256 indexed id);
    event ProductPurchased(uint256 indexed id, address indexed buyer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyMerchant(uint256 _productId) {
        require(
            msg.sender == products[_productId].merchant,
            "Not the product merchant"
        );
        _;
    }

    modifier onlyActiveProduct(uint256 _productId) {
        require(
            products[_productId].status == ProductStatus.Active,
            "Product is not active"
        );
        _;
    }

    constructor(address _userRegistryAddress) {
        admin = msg.sender;
        userRegistry = UserRegistry(_userRegistryAddress);
    }

    function createProduct(
        string memory _name,
        string memory _description,
        uint256 _price
    ) external {
        require(
            userRegistry.isMerchant(msg.sender),
            "Only Merchant can create Product"
        );
        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: _name,
            description: _description,
            price: _price,
            status: ProductStatus.Active,
            merchant: msg.sender
        });

        emit ProductCreated(productCount, _name, msg.sender);
    }

    function updateProduct(
        uint256 _productId,
        string memory _newName
    ) external onlyMerchant(_productId) onlyActiveProduct(_productId) {
        products[_productId].name = _newName;

        emit ProductUpdated(_productId, _newName);
    }

    function deleteProduct(
        uint256 _productId
    ) external onlyMerchant(_productId) onlyActiveProduct(_productId) {
        products[_productId].status = ProductStatus.Inactive;

        emit ProductDeleted(_productId);
    }

    function purchaseProduct(
        uint256 _productId
    ) external payable onlyActiveProduct(_productId) {
        require(msg.value >= products[_productId].price, "Insufficient funds");

        // Transfer funds to the merchant
        payable(products[_productId].merchant).transfer(msg.value);

        emit ProductPurchased(_productId, msg.sender);
    }
}
