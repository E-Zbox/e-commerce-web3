const { ethers } = require("hardhat");

const products = [
    {
        _name: "Tuxedo InfinityBook Pro 14 Linux laptop",
        _description:
            "Tuxedo InfinityBook Pro Gen 7 Laptop comes with 12th Generation, Intel Core i7-12700H Processor, 8GB DDR4 3200MHz Memory and 1TB Samsung 980 (NVMe PCIe 3.0) Solid state drive internal storage. The Laptop has 14.0 inch screen size, Length: 308.8 mm; Width: 215 mm; Height: 15,6 mm Physical Dimension and 2.2 pounds weight and Integrated 53 Wh lithium-ion battery. \nPrice - NNG906,200",
        _price: ethers.parseEther("0.00000906"),
    },
    {
        _name: "Tuxedo InfinityBook Pro 14 Gen 8",
        _description:
            "Tuxedo InfinityBook Pro Gen 8 Laptop comes with 13th Generation, Intel Core i7-13700H Processor, 16GB DDR5 4800MHz Memory and 2TB Samsung 980 (NVMe PCIe 3.0) solid state drive internal storage. The Laptop has 14.0 inch screen size, Length: 308.8 mm; Width: 215 mm; Height: 15,6 mm Physical Dimension and 1.3kg weight and Integrated 53 Wh lithium-ion battery. \nPrice - NNG786,140",
        _price: ethers.parseEther("0.00000786"),
    },
    {
        _name: "Apple Macbook Air 13 (2022)",
        _description:
            "Apple Macbook Air Laptop with Apple M2 chip Processor, 8GB LPDDR4X 3733Mhz Memory and 512GB PCIe-based SSD solid state drive internal storage. The Laptop has 13.6 inch screen size, Height: 0.16, 0.63 inch (0.41, 1.61 cm) x Width: 11.97 inches (30.41 cm) x Depth: 8.36 inches (21.24 cm) Physical Dimension and 2.8 pounds (1.29 kg) weight and 49.9 watt hour Lithium polymer battery. \nPrice - NNG551,540",
        _price: ethers.parseEther("0.00000551"),
    },
    {
        _name: "Apple Macbook Air 15 M2",
        _description:
            "Apple Macbook Air 15 Laptop with Apple M2 chip, 8GB LPDDR5x 4800Mhz Memory and 512GB PCIe-based SSD solid state drive internal storage. The Laptop has 15.3 inch screen size, Height: 0.45 inch (1.15 cm) Width: 13.40 inches (34.04 cm) Depth: 9.35 inches (23.76 cm) Physical Dimension and 3.3 pounds (1.51 kg) weight and 66.5-watt‑hour lithium‑polymer battery. \nPrice - NNG643,540",
        _price: ethers.parseEther("0.00000643"),
    },
    {
        _name: "Dell XPS 13 (9315)",
        _description:
            "Dell XPS 13 9315 Laptop Comes with 12th Generation, Intel Core i7-1250U Processor, 16GB 5200MHz LPDDR5 dual channel Memory and 512GB PCIe NVMe x2 SSD solid state drive internal storage. The Laptop has 13.4 inch screen size, Height: 0.55 in. (13.99 mm) Width: 11.63 in. (295.4 mm) Depth: 7.86 in. (199.4 mm) Physical Dimension and 2.59 lb (1.17 kg) weight and 3-Cell 51 Whr (Integrated) battery. \nPrice - NNG414,000",
        _price: ethers.parseEther("0.00000414"),
    },
    {
        _name: "Dell XPS 13 2 in 1 (Core i7 12th Gen)",
        _description:
            "Dell XPS 13 9315 2-in-1 Laptop Comes with 12th Generation, Intel Core i7-1250U Processor, 16GB LPDDR4x 4267MHz Memory and 512GB M.2 PCIe NVMe SSD solid state drive internal storage. The Laptop has 13.0 inch screen size, Height: 0.29 in (7.40 mm), Width: 11.50 in (292.50 mm), Depth: 7.90 in (201.20 mm) Physical Dimension and Tablet: 736 grams / 1.6 pounds Folio: 560 grams / 1.23 pounds weight and 3-Cell 49.5Whr (Integrated) battery. \nPrice - NNG505,540",
        _price: ethers.parseEther("0.00000505"),
    },
];

const main = async () => {
    try {
        const ecommerceAddress = "0xE8Ab08AA477D82ee5F7bf90268983F56A99555dd";
        const ecommerceContract = (
            await ethers.getContractFactory("contracts/ECommerce.sol:ECommerce")
        ).attach(ecommerceAddress);

        for (let i = 0; i < products.length; i++) {
            const { _name, _description, _price } = products[i];

            const tx = await ecommerceContract.createProduct(
                _name,
                _description,
                _price
            );

            const receipt = await tx.wait();

            console.log(receipt);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main()
    .then()
    .catch((err) => console.log(err));
