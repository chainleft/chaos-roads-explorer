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
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0];
                const signer = provider.getSigner(account);

                const numberSlider = document.getElementById("number-slider");
                const _number = parseInt(numberSlider.value, 10);

                const nftContractWithSigner = nftContract.connect(signer);
                const tx = await nftContractWithSigner.observe(tokenId, _number);
                console.log("Transaction submitted:", tx);
                await tx.wait();
                console.log("Transaction mined");
            } catch (error) {
                console.error("Error calling observe function:", error);
            }
        });
    }
});


