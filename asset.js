const provider = new ethers.providers.Web3Provider(window.ethereum);
const nftContract = new ethers.Contract(contractAddress, contractABI, provider);

const observeBtn = document.getElementById("observe-btn");

const assetContent = document.getElementById("asset-content"); // Add this id to the div containing the asset content

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("walletConnected", (event) => {
        const { account } = event.detail;
        // Add any functionality that you want to execute when the wallet is connected
        assetContent.classList.remove("d-none");
    });

    document.addEventListener("walletDisconnected", () => {
        // Add any functionality that you want to execute when the wallet is disconnected
        assetContent.classList.add("d-none");
    });

    if (observeBtn) {
        observeBtn.addEventListener("click", async () => {
            // ... rest of your code
        });
    }
});
