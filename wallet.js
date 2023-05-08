document.addEventListener("DOMContentLoaded", () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftContract = new ethers.Contract(contractAddress, contractABI, provider);
    const connectWalletBtn = document.getElementById("connect-wallet");
    const walletAddressSpan = document.getElementById("wallet-address");
    const walletInfoDiv = document.getElementById("wallet-info");

    if (connectWalletBtn) {
        connectWalletBtn.addEventListener("click", async () => {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0];
                walletAddressSpan.innerText = account;
                walletAddressSpan.classList.remove("d-none");
                connectWalletBtn.classList.add("d-none");

                const walletConnectedEvent = new CustomEvent("walletConnected", {
                    detail: { account },
                });
                document.dispatchEvent(walletConnectedEvent);

            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        });
    }

    walletAddressSpan.addEventListener("click", disconnectWallet);

    function disconnectWallet() {
        walletAddressSpan.innerText = "Click to disconnect";
        walletAddressSpan.classList.add("d-none");
        connectWalletBtn.classList.remove("d-none");

        const walletDisconnectedEvent = new CustomEvent("walletDisconnected");
        document.dispatchEvent(walletDisconnectedEvent);
    }

    async function checkWalletConnection() {
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                const account = accounts[0];
                walletAddressSpan.innerText = account;
                walletAddressSpan.classList.remove("d-none");
                connectWalletBtn.classList.add("d-none");

                const walletConnectedEvent = new CustomEvent("walletConnected", {
                    detail: { account },
                });
                document.dispatchEvent(walletConnectedEvent);
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    }

    checkWalletConnection();
});
