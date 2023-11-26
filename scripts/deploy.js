const { ethers } = require("hardhat");

const main = async () => {
    try {
        const userRegistryContract = await ethers.deployContract(
            "UserRegistry"
        );

        await userRegistryContract.waitForDeployment();

        const userRegistryAddress = await userRegistryContract.getAddress();

        const ecommerceContract = await ethers.deployContract("ECommerce", [
            userRegistryAddress,
        ]);

        await ecommerceContract.waitForDeployment();

        const ecommerceAddress = await ecommerceContract.getAddress();

        console.log(`UserRegistryAddress = ${userRegistryAddress}`);

        console.log(`ECommerceAddress = ${ecommerceAddress}`);
    } catch (error) {}
};

main()
    .then()
    .catch((err) => console.error(err));
